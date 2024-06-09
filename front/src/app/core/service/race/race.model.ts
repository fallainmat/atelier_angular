import { Robot } from '../robot/robot.model';

export enum RaceState {
  BetsOpened = 'BetsOpened',
  BetsClosed = 'BetsClosed',
  InProgress = 'InProgress',
  Finished = 'Finished'
}

export interface Race {
  robots: Array<Robot>;
  startTime: Date;
  endBetTime: Date;
  state: RaceState;
}
