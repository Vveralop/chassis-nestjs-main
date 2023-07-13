import { UtilsModule } from './shared/utils/utils.module';
import { LoggerModule } from './adapter/Logger/logger.module';
import { InterceptorModule } from './shared/interceptor/interceptor.module';
import { Module } from '@nestjs/common';
import { HealthModule } from './domain/health/health.module';
import { ConfigModule } from '@nestjs/config';
import { ConsumerModule } from './domain/ConsumeExampleDomain/consume.module';
import { UserModule } from './domain/user/user.module';
import { PostModule } from './domain/post/post.module';


@Module({
  imports: [
    UtilsModule,
    ConfigModule.forRoot(),
    LoggerModule,
    InterceptorModule,
    HealthModule,
    ConsumerModule,
    UserModule,
    PostModule
  ],
  providers: []
})

export class AppModule {

}
