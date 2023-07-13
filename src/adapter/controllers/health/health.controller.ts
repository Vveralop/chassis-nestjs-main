import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {PinoLogger} from 'nestjs-pino'

@ApiTags('Health')
@Controller()
export class HealthController {
  constructor(private readonly logger:PinoLogger) {}

  @Get('health')
  @HttpCode(200)
  healthcheck(): string {
    this.logger.info('prueba health')
    return "Request is ok";
  }
}
