import { Body, Controller, Post } from '@nestjs/common';
import { RaceService } from '../service/race.service';
import { Race } from '../model/race.model';
import { CreateRaceDto } from '../dto/create-race.dto';
import { ApiResponse } from '@nestjs/swagger';


@Controller('api/race')
export class RaceController {
  constructor(private readonly raceService: RaceService) {
  }

  @Post()
  @ApiResponse({ type: Race, description: 'Return the created race'})
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createRaceDto: CreateRaceDto): Race {
    return this.raceService.create(createRaceDto.startTime);
  }
}
