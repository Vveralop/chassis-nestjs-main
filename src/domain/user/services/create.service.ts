import { Injectable, InternalServerErrorException} from '@nestjs/common';
import { PrismaService } from '../../../adapter/database/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class CreateService {
  constructor(private prisma: PrismaService) {}

  async execute(createUserDto: CreateUserDto) {
    
    const user = await this.prisma.user.create({data:{
      ...createUserDto
    }})
    
    return user;
    
  }
}