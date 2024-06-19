import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

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
  color?: string;
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
  race = signal<RaceModel>({ status: BetStatus.INACTIVE });
  betsSelected = signal<BetSelectedModel[]>([]);
  raceActivated = computed(() => this.race().status === BetStatus.ACTIVE);

  constructor(private httpClient: HttpClient) {
  }

  getBets(): Observable<BetModel[]> {
    return this.httpClient.get<{ betList: BetModel[] }>('assets/mock/bet.json').pipe(
      map((res) => res.betList),
      map((res) => res.map((bet: BetModel) => ({
            ...bet,
            runners: bet.runners.sort((a, b) => parseFloat(a.odds) - parseFloat(b.odds))
          })
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
