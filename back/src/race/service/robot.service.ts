import { Injectable } from '@nestjs/common';
import {
  Color,
  Robot,
  RobotStat,
  RunningPace,
  statsRanges,
  StatType,
} from '../model/robot.model';

@Injectable()
export class RobotService {
  private robots: Array<Robot> = [];

  constructor() {
    const robotLis: Array<{ name: string, color: Color, image: string }> = [
      {
        name: 'Mega Man',
        color: Color.Purple,
        image: 'mega-man',
      },
      {
        name: 'Optimus Prime',
        color: Color.Emeraude,
        image: 'optimus-prime',
      },
      {
        name: 'Johnny 5',
        color: Color.Cyan,
        image: 'johnny-5',
      },
      {
        name: 'Bishop',
        color: Color.Pink,
        image: 'bishop',
      },
    ];
    this.robots = robotLis.map((robotInfos) => ({
      name: robotInfos.name,
      color: robotInfos.color,
      image: robotInfos.image,
      stats: [],
      state: {energy: 0, distanceTraveled: 0, pace: RunningPace.Rest},
    }));
  }

  findAll(): Array<Robot> {
    return this.robots.map((robot) => {
      const stamina = this.generateStat(StatType.Stamina);
      return {
        ...robot,
        stats: [
          stamina,
          this.generateStat(StatType.Intelligence),
          this.generateStat(StatType.Speed),
        ],
        state: {...robot.state, energy: stamina.value},
      }
    });
  }

  private generateStat(type: StatType): RobotStat {
    return {
      type,
      value: Math.floor(
          Math.random() * (statsRanges[type].max - statsRanges[type].min + 1) +
          statsRanges[type].min,
      ),
    };
  }
}
