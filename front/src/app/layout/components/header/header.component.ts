import { ChangeDetectorRef, Component, effect, inject, signal } from '@angular/core';
import { UserService } from '../../../core/service/user/user.service';
import { HttpClient } from '@angular/common/http';
import { AsyncPipe, DatePipe, JsonPipe, NgStyle } from '@angular/common';
import { Race, RaceState } from '../../../core/service/race/race.model';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    DatePipe,
    NgStyle
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  currentUser = inject(UserService).userCurrent;

  raceInfos = signal<Race | null>(null);

  eventSource?: EventSource;

  raceStartTime = signal<number>(0);

  protected readonly RaceState = RaceState;

  private raceTimer = 0;

  constructor(private httpClient: HttpClient, private cdr: ChangeDetectorRef) {
    this.connectRaceEventSource();
    effect(() => {
      if (this.raceInfos() === null) {
        this.raceStartTime.set(0);
      }
    }, { allowSignalWrites: true })
  }

  launchRace() {
    this.raceInfos.set(null);
    this.httpClient
      .post<Race>('/api/race', {
        startTime: this.toISOStringWithTimezone(new Date(new Date().getTime() + 20000))
      })
      .pipe(
        map(raceInfos => ({
          ...raceInfos,
          ...{
            startTime: new Date(raceInfos.startTime),
            endBetTime: new Date(raceInfos.endBetTime)
          }
        }))
      )
      .subscribe((race) => this.initRaceTimer(race));
  }

  private initRaceTimer(raceInfos: Race) {
    clearInterval(this.raceTimer);
    if (raceInfos?.state === RaceState.BetsOpened) {
      this.raceTimer = setInterval(() => {
        const remainingTime = Math.ceil((raceInfos.endBetTime.getTime() - new Date().getTime()) / 1000);
        this.raceStartTime.set(remainingTime);
        if (remainingTime < 0) {
          clearInterval(this.raceTimer);
        }
      }, 1000);
    }
  }

  private connectRaceEventSource() {
    this.eventSource = new EventSource('/api/race');
    this.eventSource.onmessage = (message) => {
      const data = JSON.parse(message.data) as Race;
      // TODO create a DTO parser in service
      data.startTime = new Date(data.startTime);
      data.endBetTime = new Date(data.endBetTime);
      this.raceInfos.set(data);
    };
    this.eventSource.onopen = () => {
      console.info('Race event source connected');
    }
    this.eventSource.onerror = (errorEvent) => {
      console.error('Event source error', errorEvent);
      this.eventSource?.close();
      setTimeout(() => {
        console.info('trying to reconnect');
        this.connectRaceEventSource();
      }, 1000);
    }
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
