export enum StatType {
  Speed = 'Speed',
  Stamina = 'Stamina',
  Intelligence = 'Intelligence',
}

export enum RunningPace {
  Sprint = 'Sprint',
  Rest = 'Rest',
  Exhausted = 'Exhausted',
}

export interface RobotStat {
  type: StatType;
  value: number;
}

export interface  RunningState {
  pace: RunningPace;
  distanceTraveled: number
  energy: number;
}

export interface Robot {
  name: string;
  stats: Array<RobotStat>;
  color: string;
  state: RunningState;
}
