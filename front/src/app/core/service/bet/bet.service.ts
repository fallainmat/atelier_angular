import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, Observable, switchMap } from 'rxjs';
import { RaceService } from '../race/race.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { StatType } from '../robot/robot.model';

export interface BetModel {
  id: string;
  name: string;
  status: BetStatus;
  type: BetType;
  action: BetAction;
  runners: RunnerModel[];
}

export interface RunnerModel {
  id: string;
  name: string;
  odds: string;
  color: string;
}

export interface BetSelectedModel extends RunnerModel {
  bet: {
    id: string;
    name: string;
    action: BetAction;
  },
  coins: number;
}

export enum BetAction {
  FIRST_PLACE = 'first_place',
  LAST_PLACE = 'last_place',
}

export enum BetStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum BetType {
  SIMPLE = 'simple',
}

export interface RaceModel {
  status: BetStatus;
}

@Injectable({
  providedIn: 'root'
})
export class BetService {
  betsSelected = signal<BetSelectedModel[]>([]);

  private raceService = inject(RaceService);
  private raceChange = toSignal(this.raceService.getCurrentRace$().pipe(
    distinctUntilChanged((a, b) => a?.uuid === b?.uuid))
  );
  private betsTypes = toSignal(inject(HttpClient).get<BetModel[]>('assets/mock/bet.json'))

  constructor(private httpClient: HttpClient) {
    effect(() => {
      this.raceChange();
      this.betsSelected.set([]);
    }, { allowSignalWrites: true });
  }

  getBets(): Observable<BetModel[]> {
    return this.httpClient.get<BetModel[]>('assets/mock/bet.json').pipe(
      switchMap(bets => this.raceService.getRaceRobots$().pipe(
          map(robots => robots.sort((a, b) => {
            const aSpeed = a.stats.find(s => s.type === StatType.Speed)?.value || 0;
            const bSpeed = b.stats.find(s => s.type === StatType.Speed)?.value || 0;
            return aSpeed - bSpeed;
          })),
          map(robots => bets.map(bet => ({
              ...bet,
              runners: bet.runners
                .slice(0, robots.length)
                .map((runner, index) => ({
                  ...runner,
                  name: robots[index].name,
                  color: robots[index].color
                }))
                .sort((a, b) => parseFloat(a.odds) - parseFloat(b.odds))
            }))
          )
        )
      )
    );
  }

  saveBet(newBet: BetSelectedModel) {
    this.betsSelected.update((prev) => {
      const existingBet = prev.find(bs => bs.bet.id === newBet.bet.id);
      return existingBet
        ? prev.map(bs => bs.bet.id === newBet.bet.id ? newBet : bs)
        : [...prev, newBet];
    })
  }

  deleteBet(betDeleted: BetSelectedModel) {
    this.betsSelected.update((prev) =>
      prev.filter(pre => pre.bet.id !== betDeleted.bet.id)
    );
  }
}
