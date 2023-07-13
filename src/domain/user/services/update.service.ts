import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../adapter/database/prisma.service';
import { WhereUserDto } from '../dto/where-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UpdateService {
  constructor(private prisma: PrismaService) {}

  async update(params: {
    where: WhereUserDto;
    data: UpdateUserDto;
  }) {
    try {
      const { data, where } = params;
      const user = await this.prisma.user.update({data, where})
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}