import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

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
  app.useGlobalInterceptors(new ResponseInterceptor());

  // global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

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
  await app.listen(port);
}

void bootstrap();
