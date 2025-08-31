import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { DataResponseInterceptor } from './common';

/**
 * Bootstrap the application.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global pipe for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // global response interceptor
  app.useGlobalInterceptors(new DataResponseInterceptor());

  // swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });

  const port = process.env.PORT ?? 3000;
  app.enableCors();
  await app.listen(port);
}

void bootstrap();
