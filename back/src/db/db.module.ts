import { Global, Module } from '@nestjs/common';
import { DbService } from './service/db.service';

@Global()
@Module({
  providers: [
    {
      provide: 'APP_ROOT',
      useValue: __dirname
    },
    DbService
  ],
  exports: [DbService]
})
export class DbModule {
}
