import { Controller, Get, Param, UseFilters,UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExceptionDTO } from '../../../shared/dto/httpexception.dto';
import { Body, Post, Req } from '@nestjs/common/decorators';
import { Request } from 'express';
import { ConsumerGetResponseDto } from '../../../domain/ConsumeExampleDomain/dto/consumer-get-response.dto';
import { ConsumePostDto } from '../../../domain/ConsumeExampleDomain/dto/consume-post.dto';
import { ConsumeGetService, ConsumePostService } from '../../../domain/ConsumeExampleDomain/services';
import { CreateUserDto } from '../../../domain/user/dto/create-user.dto';

@UseInterceptors()
@ApiTags('Consumer')
@Controller('consumer')
@UseFilters(HttpExceptionFilter)
export class ConsumerController {
  constructor(
    private readonly ConsumerGetService: ConsumeGetService,
    private readonly ConsumerPostService: ConsumePostService,

    ) { }

  @Get(':id')
  @ApiOperation({ summary: 'Get Insured And Beneficiaries By Policy ' })

  //Example api swagger custom status response
  @ApiResponse({ status: 400, type: ExceptionDTO })
  @ApiResponse({ status: 401, type: ExceptionDTO })
  @ApiResponse({ status: 404, type: ExceptionDTO })
  @ApiResponse({ status: 500, type: ExceptionDTO })

  @ApiOkResponse({type:ConsumerGetResponseDto})

  async findOne(@Param('id') id: string, @Req() req:Request) {
    
    return await  this.ConsumerGetService.execute(id,req);
  }

  @Post()
  // Example api swagger response 
  @ApiBadRequestResponse({type:ExceptionDTO})
  @ApiInternalServerErrorResponse({type:ExceptionDTO})
  
  @ApiCreatedResponse({type:CreateUserDto})
  async create(@Body() body:CreateUserDto, @Req() req:Request){
    return await this.ConsumerPostService.execute(body,req)
  }

}
