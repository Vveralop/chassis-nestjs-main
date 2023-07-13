import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../../adapter/database/prisma.service';
import { WhereUniquePostDto } from '../dto/where-unique-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class UpdateService {
  constructor(private prisma: PrismaService) {}
  
  async execute(params: {
    where: WhereUniquePostDto;
    data: UpdatePostDto;
  }) {
    try {
      const { data, where } = params;
      const post = await this.prisma.post.update({data, where})
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}