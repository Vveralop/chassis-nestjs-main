import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../adapter/database/prisma.service';
import { WhereUniquePostDto } from '../dto/where-unique-post.dto';
import { WherePostDto } from '../dto/where-post.dto';
import { OrderByPostDto } from '../dto/orderby-post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async getPost(whereUniquePostDto: WhereUniquePostDto) {
    try {
      const post = await this.prisma.post.findUnique({
        where: whereUniquePostDto,
      });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getPosts(params: {
    skip?: number;
    take?: number;
    cursor?: WhereUniquePostDto;
    where?: WherePostDto;
    orderBy?: OrderByPostDto;
  }) {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      const post = await this.prisma.post.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}