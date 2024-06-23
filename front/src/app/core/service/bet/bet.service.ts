import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RaceService } from '../race/race.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Robot, StatType } from '../robot/robot.model';
import { BetModel, BetSelectedModel } from './bet.model';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  raceChanged = toSignal(inject(RaceService).newRace$());

  betsTypes = toSignal(inject(HttpClient).get<BetModel[]>('assets/mock/bet.json'))

  betsSelected = signal<BetSelectedModel[]>([]);

  bets = computed<BetModel[]>(() => {
    const robots: Robot[] = ([...(this.raceChanged()?.robots || [])]).sort(this.compareRunners);
    const bets = this.betsTypes() || [];
    return bets.map(bet => this.configureBet(bet, robots));
  });

  constructor(private httpClient: HttpClient) {
    effect(() => {
      this.raceChanged();
      this.betsSelected.set([]);
    }, { allowSignalWrites: true });
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

  private compareRunners(runner1: Robot, runner2: Robot): number {
    const runner1Speed = runner1.stats.find(s => s.type === StatType.Speed)?.value || 0;
    const runner2Speed = runner2.stats.find(s => s.type === StatType.Speed)?.value || 0;
    return runner1Speed - runner2Speed;
  }

  private configureBet(bet: BetModel, robots: Array<Robot>) {
    return {
      ...bet,
      runners: bet.runners
        .slice(0, robots.length)
        .map((runner, index) => ({
          ...runner,
          name: robots[index].name,
          color: robots[index].color
        }))
        .sort((a, b) => parseFloat(a.odds) - parseFloat(b.odds))
    };
  }
}
