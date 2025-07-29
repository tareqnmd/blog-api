import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/root/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global pipe
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // swagger
  const config = new DocumentBuilder()
    .setTitle('Blog  API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('blog-api-doc', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
