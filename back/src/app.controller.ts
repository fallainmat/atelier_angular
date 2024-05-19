import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiResponse({ status: 200, description: 'The application is healthy'})
  health(): string {
    return 'This is not the service you are looking for';
  }
}
