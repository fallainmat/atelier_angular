import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RaceModule } from './race/race.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [RaceModule, DbModule],
  controllers: [AppController]
})
export class AppModule {
}
