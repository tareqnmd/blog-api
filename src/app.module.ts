import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import appConfig from './config/app.config';
import dbConfig from './config/db.config';
import envValidation from './config/env.validation';
import { AuthModule } from './modules/auth/auth.module';
import jwtConfig from './modules/auth/config/jwt.config';
import { AccessTokenGuard } from './modules/auth/guards/access-token.guard';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { BlogsModule } from './modules/blogs/blogs.module';
import { MetaOptionsModule } from './modules/meta-options/meta-options.module';
import { PaginationModule } from './modules/pagination/pagination.module';
import { TagsModule } from './modules/tags/tags.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    BlogsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env'],
      load: [appConfig, dbConfig],
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: configService.get('dbConfig.autoLoadEntities'),
        synchronize: configService.get('dbConfig.synchronize'),
        host: configService.get('dbConfig.host'),
        port: configService.get('dbConfig.port'),
        username: configService.get('dbConfig.username'),
        password: configService.get('dbConfig.password'),
        database: configService.get('dbConfig.name'),
      }),
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
