export enum StatType {
  Speed = 'Speed',
  Stamina = 'Stamina',
  Intelligence = 'Intelligence',
}

export interface RobotStat {
  type: StatType;
  value: number;
}

export interface Robot {
  name: string;
  stats: Array<RobotStat>;
  color: string;
  distanceTraveled: number;
}
