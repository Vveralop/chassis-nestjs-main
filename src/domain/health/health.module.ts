import { Module } from '@nestjs/common';
import { HealthController } from '../../adapter/controllers/health/health.controller';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}
