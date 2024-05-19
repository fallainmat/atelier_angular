import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { RaceModule } from './race/race.module';

@Module({
  imports: [RaceModule],
  controllers: [AppController],
})
export class AppModule {
}
