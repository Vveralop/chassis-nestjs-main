import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { WhereUniquePostDto } from '../dto/where-unique-post.dto';
import { PrismaService } from '../../../adapter/database/prisma.service';

@Injectable()
export class DeleteService {
  constructor(private prisma: PrismaService) {}

  async execute(whereUniquePostDto: WhereUniquePostDto) {
    try {
      const post = await this.prisma.post.delete({where: whereUniquePostDto})
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}