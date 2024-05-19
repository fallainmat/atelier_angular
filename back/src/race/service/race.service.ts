import { Injectable } from '@nestjs/common';
import { Race } from '../model/race.model';
import { RobotService } from './robot.service';

@Injectable()
export class RaceService {
  private activeRace: Race = null;

  constructor(private readonly robotService: RobotService) {
  }

  create(startTime: string) {
    this.activeRace = new Race(new Date(startTime));
    this.activeRace.registerRobots(this.robotService.findAll());
    return this.activeRace;
  }
}
