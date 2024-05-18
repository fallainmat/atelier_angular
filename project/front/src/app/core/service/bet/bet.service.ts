import {Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";

export interface BetModel {
  id: string;
  name: string;
  status: BetStatus;
  type: BetType;
  action: BetAction;
  runners: RunnerModel[];
}

export interface RunnerModel {
  id: string,
  name: string,
  odds: string
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
  race = signal<RaceModel>({status: BetStatus.INACTIVE});
  betSelected = signal<BetSelectedModel[]>([]);
  validateBet = signal(false);

  constructor(private httpClient: HttpClient) {}

  getBets(): Observable<BetModel[]> {
    return this.httpClient.get<any>('assets/mock/bet.json').pipe(map((res) => res['betList']));
  }

  startRace(): Observable<void> {
    this.race.update(() => ({status: BetStatus.ACTIVE}));
    this.runRace();
    this.validateBet.set(true);
    return of();
  }

  blockValidateBet() {
    this.validateBet.set(true);
  }

  saveBet(betSelected: BetSelectedModel) {
    this.betSelected.update((prev) => {
      return !!prev.find(pre => pre.bet.id === betSelected.bet.id) ? prev.map(pre => {
        return pre.bet.id === betSelected.bet.id ? betSelected : pre;
      }) :[...prev, betSelected];
    })
  }

  deleteBet(betDeleted: BetSelectedModel) {
    this.betSelected.update((prev) => prev.filter(pre => pre.bet.id !== betDeleted.bet.id));
  }

  private runRace() {
    setTimeout(() => {
      this.race.update(() => ({status: BetStatus.INACTIVE}));
      this.validateBet.set(false);
    }, 5000 )
  }
}
