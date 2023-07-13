import { Module } from '@nestjs/common';
import { ConsumeGetService } from './services/consume-get.service';
import { ConsumerController } from '../../adapter/controllers/consumer/consumer.controller';
import { ConsumePostService } from './services/consume-post.service';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from '../../shared/utils/utils.module';
import { LoggerModule } from '../../adapter/Logger/logger.module';

@Module({
  imports:[UtilsModule, HttpModule,LoggerModule],
  controllers: [ConsumerController],
  providers: [ConsumeGetService, ConsumePostService],
})
export class ConsumerModule {}
