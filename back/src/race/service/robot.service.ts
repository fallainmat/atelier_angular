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
    const robotLis: Array<{ name: string; color: Color; description: string }> =
      [
        {
          name: 'Mega Man',
          color: Color.Blue,
          description:
            "La personnalité et l'intelligence de Mega Man correspondent à celles d'un garçon de 10 ans. Il n'a pas la maturité des robots futurs (tel Mega Man X) mais il est loyal au professeur Light et a un sens aigu de la justice, d'ailleurs il considère le professeur Light comme son père il fait de même avec Roll qu'il considère comme sa sœur et elle aussi il essaye toujours de protéger l'humanité. Comme beaucoup de robots, Mega Man obéit aux lois dérivées des trois lois de la robotique. Cependant dans Mega Man 7, il semble proche de les briser en voulant tuer le professeur Wily. Quand il le menace de son arme, dans la version originale, Mega Man reste silencieux après que Wily lui rappelle cette interdiction, mais dans la version anglaise, il dit qu'il est plus qu'un robot. Pourtant dans le jeu, Wily dit simplement que Mega Man n'a pas le droit de tuer des humains.",
        },
        {
          name: 'Optimus Prime',
          color: Color.Red,
          description:
            "Si l'histoire d'Optimus Prime change selon les versions, son caractère reste en revanche toujours le même : il est courageux, juste, compréhensif, sage, pacifique et respecté par ses guerriers. Sa devise est : « Tout être sensible a droit à la liberté. » Il défend les humains autant que les Autobots. Cependant il a pu se montrer fou de rage lorsque certains ont essayé de nuire à son entourage proche jusqu'à leur ôter la vie de sang-froid. C'est sans doute le personnage le plus mis en valeur dans la saga.\n" +
            '\n' +
            "Ses armes sont une hache, des canons, ou une épée. Il prend la forme d'un camion Peterbilt 379 rouge et bleu avec des autocollants en flammes de Transformers 1 à Transformers 4, où il se transforme en Marmon rouillé puis en Western Star 5700 XE rouge et bleu avec des autocollants en flammes. Dans ces films, ses ennemis tués sont : Bonecrusher, Demolisher, Grindor, The Fallen, Le Drillier, Les Protoforms, Brawl, Long Haul, Sideways, Scrapper, Shockwave, Megatron, Sentinel Prime, Les Traxes, Harold Attinger, Lockdown et Infernocus.",
        },
        {
          name: 'Johnny 5',
          color: Color.Purple,
          description:
            "Johnny 5 est très curieux et a une soif insatiable d'infos et de données en tout genre, plus spécialement en matière de livres et de télévision. Ayant commencé sa vie en tant que prototype militaire, il a par réaction acquis un grand respect de la vie et refuse d’utiliser ses capacités pour blesser les autres. Il est très inventif, intelligent, possède de vastes connaissances, mais peut se montrer étonnamment naïf et crédule, ou commettre des erreurs de jugement. Il trouve les humains étonnants dans leurs comportements parfois agressifs à son égard, mais semble tout de même les apprécier, et développe des amitiés étroites avec certains d’entre eux.",
        },
        {
          name: 'Wall-E',
          color: Color.Emeraude,
          description:
            'WALL-E, Waste Allocation Load Lifter Earth-Class, est un robot chargé d’une mission: celle de nettoyer la Terre de ses déchets la rendant inhabitable. Il est le dernier robot à faire cela et passe ses journées à construire des tours avec ce qu’il compacte. Il puise son énergie du Soleil et possède un animal de compagnie : Hal.\n' +
            '\n' +
            'WALL-E n’est pas un robot comme les autres puisqu’il est extrêmement curieux et n’hésite pas à récolter et collectionner tout un tas d’objets qu’il récupère lors de ses journées de travail.',
        },
      ];
    this.robots = robotLis.map((robotInfos) => ({
      name: robotInfos.name,
      color: robotInfos.color,
      description: robotInfos.description,
      stats: [],
      state: { energy: 0, distanceTraveled: 0, pace: RunningPace.Rest },
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
        state: { ...robot.state, energy: stamina.value },
      };
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
