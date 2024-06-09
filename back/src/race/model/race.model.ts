import { Robot } from './robot.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

const DELAY_BETWEEN_BETS_AND_START_MS = 10000;

export enum RaceState {
  BetsOpened = 'BetsOpened',
  BetsClosed = 'BetsClosed',
  InProgress = 'InProgress',
  Finished = 'Finished'
}

export class Race {
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

  constructor(startTime: Date) {
    if (startTime.getTime() < new Date().getTime() + DELAY_BETWEEN_BETS_AND_START_MS) {
      throw new HttpException(`A race must start at least 20 seconds after its creation`, HttpStatus.BAD_REQUEST);
    }
    this.startTime = startTime;
    this.endBetTime = new Date(startTime.getTime() - DELAY_BETWEEN_BETS_AND_START_MS);
  }

  registerRobots(robots: Array<Robot>) {
    this.robots = robots;
  }
}
