import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../adapter/database/prisma.service';
import { WhereUniqueUserDto } from '../dto/where-unique-user.dto';
import { WhereUserDto } from '../dto/where-user.dto';
import { OrderByUserDto } from '../dto/orderby-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(whereUniqueUserDto: WhereUniqueUserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: whereUniqueUserDto,
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: WhereUniqueUserDto;
    where?: WhereUserDto;
    orderBy?: OrderByUserDto;
  }) {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      const user = await this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}