import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseFilters
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { CreateService, DeleteService, PostService, UpdateService } from '../../../domain/post/services';
import { CreatePostDto } from '../../../domain/post/dto/create-post.dto';
import { HttpExceptionFilter } from '../../../shared/interceptor/http.exception.filter';

@UseFilters(HttpExceptionFilter)
@Controller('post/')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly createService: CreateService,
    private readonly updateService: UpdateService,
    private readonly deleteService: DeleteService,

  ) { }

  @Get('get/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.postService.getPost({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.getPosts({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PostModel[]> {
    return this.postService.getPosts({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('create')
  async createDraft(
    @Body() postData: CreatePostDto,
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.createService.execute({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }
  
  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.updateService.execute({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('delete/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.deleteService.execute({ id: Number(id) });
  }
}