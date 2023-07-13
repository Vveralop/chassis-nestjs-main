import {
  Controller,
  Post,
  Body,
  UseFilters
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateService } from '../../../domain/user/services/create.service';
import { CreateUserDto } from '../../../domain/user/dto/create-user.dto';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';



@UseFilters(HttpExceptionFilter)
@Controller('user')
export class UserController {
  constructor(
    private readonly createService: CreateService
  ) { }

  @Post()
  async create( @Body() userData: CreateUserDto ): Promise<User> {
    return this.createService.execute(userData);
  }
}