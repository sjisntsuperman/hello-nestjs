import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { logger } from './middleware/logger.middleware';
import { AnyExceptionFilter } from './filter/any-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  // logger
  app.use(logger);
  //interceptor
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix('hello-nestjs');
  // filter
  app.useGlobalFilters(new AnyExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  // swagger
  const options = new DocumentBuilder()
    .setTitle('hello-nestjs')
    .setDescription('The hello-nestjs API description')
    .setVersion('1.0')
    .addTag('test')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document);
  await app.listen(7001);
}
bootstrap();
