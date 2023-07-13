import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { WhereUserDto } from '../dto/where-user.dto';
import { PrismaService } from '../../../adapter/database/prisma.service';

@Injectable()
export class DeleteService {
  constructor(private prisma: PrismaService) {}

  async execute(whereUserDto: WhereUserDto) {
    try {
      const user = await this.prisma.user.delete({where: whereUserDto})
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}