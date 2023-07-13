import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
 


import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
 

async function bootstrap() {


  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(Logger))
  //BIAN IS A STANDARD FOR BANKING NAMES, NEED TO BE REPLACED WITH REAL BIANS
  app.setGlobalPrefix('bian1/bian2')


  app.useGlobalPipes((
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })

  ));
  const config = new DocumentBuilder()
    .setTitle('Swagger Documentation')
    .setDescription('Customer Policies')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);


  await app.listen(process.env.PORT).then(
    () => {
      // Logger.log({ message: "http://localhost:" + process.env.DB_PORT+ "/health" } )
      console.log(`Server running on port ${process.env.PORT}`)
    }
  );
}
bootstrap();

