import { ApiProperty } from '@nestjs/swagger';

export enum Color {
  Red = '#e74c3c',
  Green = '#27ae60',
  Blue = '#3498db',
  Purple = '#8e44ad',
  Yellow = '#f1c40f',
  Orange = '#e67e22',
}

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

export const speedPaceRate: Record<RunningPace, number> = {
  [RunningPace.Sprint]: 1.5,
  [RunningPace.Rest]: 1,
  [RunningPace.Exhausted]: 0.5
}

export class RobotStat {
  @ApiProperty({ enum: StatType })
  type: StatType;

  @ApiProperty({ minimum: 1, maximum: 100 })
  value: number;
}

class RunningState {
  @ApiProperty({ enum: StatType })
  pace: RunningPace;

  @ApiProperty()
  distanceTraveled = 0

  @ApiProperty()
  energy = 0
}

export class Robot {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: RobotStat })
  stats: Array<RobotStat>;

  @ApiProperty({ enum: Color })
  color: Color

  @ApiProperty({ type: RunningState })
  state: RunningState;
}
