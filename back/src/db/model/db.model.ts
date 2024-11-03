import { Race, RaceState } from '../../race/model/race.model';
import { Robot } from '../../race/model/robot.model';

export type BotRaceDb =  {
  races: Array<Race>;
}

export type BotRaceDbRaw = {
  races: Array<RaceRaw>;
}

export interface RaceRaw {
  uuid: string;
  robots: Array<Robot>;
  startTime: string;
  endBetTime: string;
  state: RaceState;
  raceLength: number;
}
