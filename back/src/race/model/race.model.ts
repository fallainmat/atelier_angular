import { Robot } from './robot.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';

export enum RaceState {
  BetsOpened = 'BetsOpened',
  BetsClosed = 'BetsClosed',
  InProgress = 'InProgress',
  Started = 'Started',
  Finished = 'Finished'
}

export class Race {

  static DELAY_BETWEEN_BETS_AND_START_MS = 3000;

  @ApiProperty()
  uuid: string;

  @ApiProperty({ type: Robot })
  robots: Array<Robot>;

  @ApiProperty()
  startTime: Date;

  @ApiProperty()
  endBetTime: Date;

  @ApiProperty({ enum: RaceState })
  state: RaceState = RaceState.BetsOpened;

  @ApiProperty()
  raceLength = 1000;

  constructor(startTime: Date, endBetTime?: Date, uuid?: string) {
    this.uuid = uuid ?? uuidv4();
    this.startTime = startTime;
    this.endBetTime = endBetTime ?? new Date(startTime.getTime() - Race.DELAY_BETWEEN_BETS_AND_START_MS);
  }

  registerRobots(robots: Array<Robot>) {
    this.robots = robots;
  }
}
