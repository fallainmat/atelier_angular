import { Injectable } from '@nestjs/common';
import { Color, Robot, RobotStat, StatType } from '../model/robot.model';

@Injectable()
export class RobotService {
  private robots: Array<Robot> = [
    { name: 'Megan Man', color: Color.Blue, stats: [] },
    { name: 'Optimus Prime', color: Color.Red, stats: [] },
    { name: 'Clank', color: Color.Green, stats: [] },
    { name: 'Johnny 5', color: Color.Orange, stats: [] },
    { name: 'Bishop', color: Color.Yellow, stats: [] },
    { name: 'Sonny', color: Color.Purple, stats: [] }
  ];

  findAll(): Array<Robot> {
    return this.robots.map(robot => ({
        name: robot.name,
        color: robot.color,
        stats: [
          this.generateStat(StatType.Stamina),
          this.generateStat(StatType.Intelligence),
          this.generateStat(StatType.Speed)
        ]
      })
    );
  }

  private generateStat(type: StatType): RobotStat {
    return { type, value: 1 + Math.floor(Math.random() * 99) };
  }
}
