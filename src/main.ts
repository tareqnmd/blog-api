import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { AppModule } from './app.module';
import { DataResponseExceptionFilter, DataResponseInterceptor } from './common';

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

  // global exception filter
  app.useGlobalFilters(new DataResponseExceptionFilter());

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

  // aws s3 config
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('awsConfig.awsAccessKeyId') ?? '',
      secretAccessKey: configService.get('awsConfig.awsSecretAccessKey') ?? '',
    },
    region: configService.get('awsConfig.awsRegion'),
  });

  const port = process.env.PORT ?? 3000;
  app.enableCors();
  await app.listen(port);
}

void bootstrap();
