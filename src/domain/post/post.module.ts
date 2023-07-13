import { Module } from '@nestjs/common';
import { PostController } from '../../adapter/controllers/post/post.controller';
import { PrismaModule } from '../../adapter/database/prisma.module';
import { PostService } from './services/post.service';
import { CreateService } from './services/create.service';
import { UpdateService } from './services/update.service';
import { DeleteService } from './services/delete.service';

@Module({
    imports: [PrismaModule],
    controllers: [PostController],
    providers: [PostService, CreateService, UpdateService, DeleteService]
})
export class PostModule {}