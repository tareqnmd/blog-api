import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { MetaOptionsModule } from './modules/meta-options/meta-options.module';
import { TagsModule } from './modules/tags/tags.module';
import { UsersModule } from './modules/users/users.module';
const ENV_FILE = !process.env.NODE_ENV
  ? '.env'
  : `.env.${process.env.NODE_ENV}`;
console.log(ENV_FILE);

@Module({
  imports: [
    UsersModule,
    BlogsModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development'],
      envFilePath: ENV_FILE,
    }),
    TypeOrmModule.forRootAsync({
      inject: [],
      imports: [],
      useFactory: () => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '110124',
        database: 'blogs',
      }),
    }),
    TagsModule,
    MetaOptionsModule,
  ],
})
export class AppModule {}
