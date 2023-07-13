import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { PrismaService } from '../../../adapter/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CreateService {
  constructor(private prisma: PrismaService) {}

  async execute(createPostDto: Prisma.PostCreateInput) {
    try {
    
    const post = await this.prisma.post.create({data: createPostDto})
    return post;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

}