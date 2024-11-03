import { Inject, Injectable } from '@nestjs/common';
import { BotRaceDb, BotRaceDbRaw } from '../model/db.model';
import * as fs from 'node:fs';
import { Race } from '../../race/model/race.model';

@Injectable()
export class DbService {

  private dbPath = this.appRoute + '/db.json';

  private dbInstance: BotRaceDb;

  constructor(@Inject('APP_ROOT') private appRoute: string) {
    this.initDb();
  }

  /**
   * TODO better typing
   */
  readCollection<T>(collection: string): Array<T> {
    console.log(this.dbInstance);
    return this.dbInstance[collection] as Array<T>;
  }

  /**
   * TODO better typing
   */
  writeCollection<T>(collection: string, data: Array<T>) {
    this.dbInstance[collection] = data;
    this.writeDb();
  }

  addToCollection<T>(collection: string, item: T) {
    this.dbInstance[collection].push(item);
    this.writeDb();
  }

  /**
   * TODO better typing
   */
  updateItemInCollection<T>(collection: string, item: T) {
    this.dbInstance[collection].map(r => {
      return r.uuid === (item as any).uuid ? item : r;
    })
  }

  private initDb() {
    if (fs.existsSync(this.dbPath)) {
      this.dbInstance = this.hydrateDb(
        JSON.parse(fs.readFileSync(this.dbPath, { encoding: 'utf-8' })) as BotRaceDbRaw
      );
    } else {
      this.dbInstance = { races: [] };
      this.writeDb();
    }
  }

  private writeDb() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.dbInstance));
  }

  private hydrateDb(jsonData: BotRaceDbRaw): BotRaceDb {
    const races: Array<Race> = jsonData.races.map(raceRaw => {
      const race = new Race(new Date(raceRaw.startTime), new Date(raceRaw.endBetTime), raceRaw.uuid);
      race.registerRobots(raceRaw.robots);
      race.raceLength = raceRaw.raceLength;
      return race;
    });

    return { races }
  }
}
