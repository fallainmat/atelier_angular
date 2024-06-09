import { Injectable } from '@nestjs/common';
import { Color, Robot, RobotStat, StatType } from '../model/robot.model';

@Injectable()
export class RobotService {
  private robots: Array<Robot> = [
    { name: 'Mega Man', color: Color.Blue, stats: [], distanceTraveled: 0 },
    { name: 'Optimus Prime', color: Color.Red, stats: [], distanceTraveled: 0 },
    { name: 'Clank', color: Color.Green, stats: [], distanceTraveled: 0 },
    { name: 'Johnny 5', color: Color.Orange, stats: [], distanceTraveled: 0 },
    { name: 'Bishop', color: Color.Yellow, stats: [], distanceTraveled: 0 },
    { name: 'Sonny', color: Color.Purple, stats: [], distanceTraveled: 0 }
  ];

  findAll(): Array<Robot> {
    return this.robots.map(robot => ({
        name: robot.name,
        color: robot.color,
        stats: [
          this.generateStat(StatType.Stamina),
          this.generateStat(StatType.Intelligence),
          this.generateStat(StatType.Speed)
        ],
        distanceTraveled: 0
      })
    );
  }

  private generateStat(type: StatType): RobotStat {
    return { type, value: 1 + Math.floor(Math.random() * 99) };
  }
}
