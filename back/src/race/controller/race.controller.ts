import { Body, Controller, Get, HttpException, HttpStatus, Post, Sse } from '@nestjs/common';
import { RaceService } from '../service/race.service';
import { Race } from '../model/race.model';
import { CreateRaceDto } from '../dto/create-race.dto';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { map, Observable } from 'rxjs';

@Controller('api/race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {
  }

  @Get('history')
  @ApiResponse({type: Race, description: 'Return race history'})
  getRaces() {
    return this.raceService.getRaceHistory();
  }

  @Post()
  @ApiResponse({ type: Race, description: 'Return the created race' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createRaceDto: CreateRaceDto): Race {

    if (new Date(createRaceDto.startTime).getTime() < new Date().getTime() + Race.DELAY_BETWEEN_BETS_AND_START_MS) {
      throw new HttpException(`A race must start at least 3 seconds after its creation`, HttpStatus.BAD_REQUEST);
    }
    return this.raceService.create(createRaceDto.startTime);
  }

  @Sse()
  @ApiResponse({
    description: 'Return a stream of the active race',
    content: {
      'text/event-stream': {
        schema: {
          $ref: getSchemaPath(Race)
        }
      }
    }
  })
  raceEvents(): Observable<{data: Race, retry: number}> {
    return this.raceService.getRaceEvents$()
      .pipe(
        map(race => ({
          retry: 10000,
          data: race,
        }))
      );
  }
}
