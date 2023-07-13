import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateService, UpdateService } from './services';
import { PrismaModule } from '../../adapter/database/prisma.module';
import { UserController } from '../../adapter/controllers/user/user.controller';

@Module({
    imports: [PrismaModule],
    controllers: [UserController],
    providers: [UserService, CreateService,UpdateService]
})
export class UserModule {}