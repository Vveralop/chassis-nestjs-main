import { HttpService } from '@nestjs/axios/dist';
import { Injectable } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';
import { lastValueFrom, map, catchError } from 'rxjs';
import { Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { HeadersHandlerUtils } from '../../../shared/utils/headers-handler.util';
import { PinoLogger } from 'nestjs-pino';


@Injectable()
export class ConsumeGetService {
	constructor(
		private http: HttpService, 
		private headerHandler:HeadersHandlerUtils, 
		private logger:PinoLogger) {

	}

	async execute(id: string, @Req() req:Request) {

		const headers = {...this.headerHandler.formatHeaders(req),
			anyExtraHeaderOrOverwriteOne:''
		}

		// example url 
		const getUrl = `${process.env.GET_URL_EXAMPLE}`
		
		// Example URL with params
		// const getUrl = `${process.env.GET_URL_EXAMPLE}/${id}` 

		// "lasValueFrom" convert an observable to promise

		this.logger.info({payload:{url:getUrl,headers}},'Before call GET')

		return await lastValueFrom(
			
			this.http.get(getUrl, { headers: headers }).pipe(

				map((axiosValue) => {
					//TODO something with the data: 
					return axiosValue.data
				}),

				catchError(err => { throw new InternalServerErrorException('Error on Consume api get') })

			)
		)
	}
}
