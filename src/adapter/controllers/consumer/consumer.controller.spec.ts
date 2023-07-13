/*
https://docs.nestjs.com/fundamentals/testing#unit-testing
*/

import { Test } from '@nestjs/testing';
import { ConsumerController } from './consumer.controller';
import { HttpModule } from '@nestjs/axios';
import { UtilsModule } from '../../../shared/utils/utils.module';
import { LoggerModule } from '../../Logger/logger.module';
import { ConsumerModule } from '../../../domain/ConsumeExampleDomain/consume.module';
import { ConsumeGetService } from '../../../domain/ConsumeExampleDomain/services/consume-get.service';
import { ConsumePostService } from '../../../domain/ConsumeExampleDomain/services/consume-post.service';
import { PARENT_ID, TRANSACTION_ID, CONSUMER_ID } from '../../../shared/utils/constants';
import { Request } from 'express';
import { ConsumePostDto } from 'src/domain/ConsumeExampleDomain/dto/consume-post.dto';

describe('ConsumerController', () => {
    let consumerController: ConsumerController;
    let consumerGetServ: ConsumeGetService;
    let consumerPostServ: ConsumePostService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [HttpModule,LoggerModule,UtilsModule,ConsumerModule], // Add
            controllers: [ConsumerController], // Add
            providers: [ConsumeGetService,ConsumePostService],   // Add
        }).compile();

        consumerController = moduleRef.get<ConsumerController>(ConsumerController);
        consumerGetServ = moduleRef.get<ConsumeGetService>(ConsumeGetService);
        consumerPostServ = moduleRef.get<ConsumePostService>(ConsumePostService);
        
    });

    it('0 should be defined', () => {
        expect(consumerController).toBeDefined();
    });

    it('1 getConsume', async () => {

        const mockRequest={
            headers:{
                [PARENT_ID]: '',
                [TRANSACTION_ID]: '',
                [PARENT_ID]: '',
                [CONSUMER_ID]: '',
            }
        }

        jest.spyOn(consumerGetServ,'execute').mockReturnValue(Promise.resolve('ok'))
        const result = await consumerGetServ.execute('1',mockRequest as unknown as Request)
        
        expect(result).toBe('ok')
    });

    it('2 postConsume', async () => {

        const mockRequest:any={
            headers:{
                [PARENT_ID]: '',
                [TRANSACTION_ID]: '',
                [PARENT_ID]: '',
                [CONSUMER_ID]: '',
            }
        }

        const mockPostDto:ConsumePostDto = {
            postExample: 'example'
        }
        jest.spyOn(consumerPostServ,'execute').mockReturnValue(Promise.resolve('ok'))
        const result = await consumerPostServ.execute(mockPostDto,mockRequest as unknown as Request)
        
        expect(result).toBe('ok')
    });
});
