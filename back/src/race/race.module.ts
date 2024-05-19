import { Module } from '@nestjs/common';
import { RaceService } from './service/race.service';
import { RaceController } from './controller/race.controller';
import { RobotService } from './service/robot.service';

@Module({
  controllers: [RaceController],
  providers: [RaceService, RobotService],
})
export class RaceModule {}
