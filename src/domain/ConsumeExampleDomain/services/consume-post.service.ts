import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { lastValueFrom, map, catchError } from 'rxjs';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { HeadersHandlerUtils } from '../../../shared/utils/headers-handler.util';
import { PinoLogger } from 'nestjs-pino';
import { CreateUserDto } from '../../user/dto/create-user.dto';


@Injectable()
export class ConsumePostService {
  constructor(
    private httpService:HttpService, 
    private headerHandler:HeadersHandlerUtils,
    private logger:PinoLogger){

  }
  async execute(consumerPostDto: CreateUserDto, @Req() req:Request) {

    const headers = {...this.headerHandler.formatHeaders(req),
			anyExtraHeaderOrOverwriteOne:''
		}
    const postUrl=process.env.URL_POST_EXAMPLE

    const bodyData = {
      ...consumerPostDto
    }
    //ON post use body part 
    // IMPORTANT: URL FOR POST NOT WORKING FOR THE EXAMPLE, USE A VALID URL ON ENVIRONTMENT VARIABLES
    this.logger.info({payload:{url:postUrl,headers,body:bodyData}},'Before call POST')

    return await lastValueFrom(
      this.httpService.post(postUrl,bodyData,{headers:headers} ).pipe(
        map((axiosValue) => {
					//TODO something with the data: 
					return axiosValue.data
				}),

				catchError(err => { throw new InternalServerErrorException(`Error on Consume api post: ${err.message}`)})
      )
    ) 
    
  }
}
