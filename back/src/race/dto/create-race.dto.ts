import { IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRaceDto {
  @ApiProperty({
    description: 'Race start time with the ISO8601 format YYYY-MM-DDTHH:mm:ss.sssZ',
    example: '2024-06-30T14:48:00.000Z'
  })
  @IsNotEmpty()
  @IsDateString()
  startTime: string;
}
