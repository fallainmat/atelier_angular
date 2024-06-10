import { Injectable } from '@nestjs/common';
import { Color, Robot, RobotStat, RunningPace, StatType } from '../model/robot.model';

@Injectable()
export class RobotService {
  private robots: Array<Robot> = [];

  constructor() {
    const robotLis: Array<{ name: string, color: Color }> = [
      {
        name: 'Mega Man',
        color: Color.Blue
      },
      {
        name: 'Optimus Prime',
        color: Color.Red
      },
      {
        name: 'Johnny 5',
        color: Color.Orange
      },
      {
        name: 'Bishop',
        color: Color.Yellow
      }
    ];
    this.robots = robotLis.map((robotInfos) => ({
      name: robotInfos.name,
      color: robotInfos.color,
      stats: [],
      state: { energy: 0, distanceTraveled: 0, pace: RunningPace.Rest }
    }));
  }

  findAll(): Array<Robot> {
    return this.robots.map(robot => {
      const stamina = this.generateStat(StatType.Stamina);
      return {
        ...robot,
        stats: [
          stamina,
          this.generateStat(StatType.Intelligence),
          this.generateStat(StatType.Speed)
        ],
        state: { ...robot.state, energy: stamina.value }
      }
    });
  }

  private generateStat(type: StatType): RobotStat {
    return { type, value: 1 + Math.floor(Math.random() * 99) };
  }
}
