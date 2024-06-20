import { Injectable } from '@angular/core';
import { Race, RaceState } from './race.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, distinctUntilChanged, filter, map, Observable, tap } from 'rxjs';
import { Robot } from '../robot/robot.model';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  eventSource?: EventSource;

  private currentRace$ = new BehaviorSubject<Race | null>(null);

  constructor(private httpClient: HttpClient) {
    this.connectRaceEventSource();
  }

  getCurrentRace$(): Observable<Race | null> {
    return this.currentRace$.asObservable();
  }

  getRaceState$(): Observable<RaceState> {
    return this.getCurrentRace$().pipe(
      filter((race): race is Race  => race !== null),
      map((race: Race) => race.state),
      distinctUntilChanged()
    );
  }

  getRaceRobots$() {
    return this.getCurrentRace$().pipe(
      filter((race): race is Race  => race !== null),
      distinctUntilChanged((a: Race, b: Race) => a.uuid !== b.uuid),
      map((race: Race) => race.robots)
    );
  }

  getRobotByName(name: string): Robot | undefined {
    const robots: Array<Robot> = this.currentRace$.getValue()?.robots || [];
    return robots.find(r => r.name === name);
  }

  launchNextRace(raceDueTimeMs: number) {
    this.currentRace$.next(null);
    return this.httpClient
      .post<Race>('/api/race', {
        startTime: this.toISOStringWithTimezone(new Date(new Date().getTime() + raceDueTimeMs))
      }).subscribe();
  }

  private connectRaceEventSource() {
    this.eventSource = new EventSource('/api/race');
    this.eventSource.onmessage = (message) => {
      this.currentRace$.next(this.parseRace(JSON.parse(message.data) as Race));
    };
    this.eventSource.onopen = () => console.info('Connected to Race event source');
    this.eventSource.onerror = (errorEvent) => {
      console.error('Event source error', errorEvent);
      this.eventSource?.close();
      setTimeout(() => {
        console.info('trying to reconnect');
        this.connectRaceEventSource();
      }, 1000);
    }
  }

  private parseRace(raceInfos: Race): Race {
    return ({
      ...raceInfos,
      startTime: new Date(raceInfos.startTime),
      endBetTime: new Date(raceInfos.endBetTime)
    });
  }

  private toISOStringWithTimezone(date: Date) {
    const pad = (n: number) => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
    const getTimezoneOffset = (date: Date) => {
      const tzOffset = -date.getTimezoneOffset();
      const diff = tzOffset >= 0 ? '+' : '-';
      return diff + pad(tzOffset / 60) + ':' + pad(tzOffset % 60);
    };
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      getTimezoneOffset(date);
  };
}
