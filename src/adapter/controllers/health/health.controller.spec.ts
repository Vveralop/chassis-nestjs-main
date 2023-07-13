import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { AppModule } from '../../../app.module';
import { LoggerModule } from '../../Logger/logger.module';

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports:[LoggerModule],
      controllers: [HealthController],
      providers: [],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(healthController).toBeDefined();
    });
  });
});
