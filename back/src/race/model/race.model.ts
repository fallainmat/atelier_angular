import { Robot } from './robot.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class Race {
  @ApiProperty({type: Robot})
  robots: Array<Robot>;

  @ApiProperty()
  startTime: Date;

  constructor(startTime: Date) {
    if (startTime.getTime() < new Date().getTime() + 10000) {
      throw new HttpException('A race must be in the future', HttpStatus.BAD_REQUEST);
    }
    this.startTime = startTime;
  }

  registerRobots(robots: Array<Robot>) {
    this.robots = robots;
  }
}
