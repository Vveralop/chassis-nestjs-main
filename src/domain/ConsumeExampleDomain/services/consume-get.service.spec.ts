import { Test } from '@nestjs/testing';
import { ConsumeGetService } from './consume-get.service';
import { LoggerModule } from '../../../adapter/Logger/logger.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { UtilsModule } from '../../../shared/utils/utils.module';
import { of } from "rxjs";
import { AxiosResponse } from "axios";
import { PARENT_ID, TRANSACTION_ID, CONSUMER_ID } from '../../../shared/utils/constants';
import { Request } from 'express';

// IMPORTANT: USE descripe.only() for all those test or it.only() for one test to call just selected test/s on run on npm run test  
// IMPORTANT: USE descripe.skip() for all those test or it.skip() for one test to avoid run on npm run test  

describe('ConsumeGetService', () => {
    let consumeGetService: ConsumeGetService;
    let httpService: HttpService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [LoggerModule,HttpModule,UtilsModule], // Add
            controllers: [], // Add
            providers: [ConsumeGetService],   // Add
        }).compile();

        consumeGetService = moduleRef.get<ConsumeGetService>(ConsumeGetService);
        httpService = moduleRef.get<HttpService>(HttpService);

    });

    it('0 should be defined', () => {
        expect(consumeGetService).toBeDefined();
    });

    it('1 Axios Call GET', async () => {
        const mockRequest:any={
            headers:{
                [TRANSACTION_ID]: '',
                [PARENT_ID]: '',
                [CONSUMER_ID]: '',
            }
        }
        const mockResp:AxiosResponse<any, any> ={
            data: {
                message:'someTestValue'
            },
            status: 0,
            statusText: '',
            headers: undefined,
            config: undefined
        }

        jest.spyOn(httpService, 'get').mockReturnValue( of(mockResp) );

        const result = await consumeGetService.execute('1', mockRequest as unknown as Request)
        expect(result.message).toBe(mockResp.data.message)

    });
});
