
import { Test } from '@nestjs/testing';
import { ConsumePostService } from './consume-post.service';
import { LoggerModule } from '../../../adapter/Logger/logger.module';
import { HttpModule, HttpService } from '@nestjs/axios';
import { UtilsModule } from '../../../shared/utils/utils.module';
import { AxiosResponse } from 'axios';
import { TRANSACTION_ID, PARENT_ID, CONSUMER_ID } from '../../../shared/utils/constants';
import { of } from 'rxjs';
import { ConsumePostDto } from 'src/domain/ConsumeExampleDomain/dto/consume-post.dto';
import { Request } from 'express';

describe('ConsumePostService', () => {
    let consumePostService: ConsumePostService;
    let httpService: HttpService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [LoggerModule,HttpModule,UtilsModule], // Add
            controllers: [], // Add
            providers: [ConsumePostService],   // Add
        }).compile();

        consumePostService = moduleRef.get<ConsumePostService>(ConsumePostService);
        httpService = moduleRef.get<HttpService>(HttpService);
    });

    it('0 should be defined', () => {
        expect(consumePostService).toBeDefined();
    });

    it('1 Axios Call POST', async () => {
        const mockRequest:any={
            headers:{
                [TRANSACTION_ID]: '',
                [PARENT_ID]: '',
                [CONSUMER_ID]: '',
            }
        }
        const mockBody:ConsumePostDto ={
            postExample: 'Example Post'
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

        jest.spyOn(httpService, 'post').mockReturnValue( of(mockResp) );

        const result = await consumePostService.execute(mockBody, mockRequest as unknown as Request)
        expect(result.message).toBe(mockResp.data.message)

    });
});
