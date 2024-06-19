import { Robot } from '../robot/robot.model';

export enum RaceState {
  BetsOpened = 'BetsOpened',
  BetsClosed = 'BetsClosed',
  InProgress = 'InProgress',
  Finished = 'Finished',
  Started = 'Started'
}

export interface Race {
  uuid: string;
  robots: Array<Robot>;
  startTime: Date;
  endBetTime: Date;
  state: RaceState;
}
