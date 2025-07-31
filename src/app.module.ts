import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    UsersModule,
    BlogsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [],
      imports: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '110124',
        database: 'blogs',
      }),
    }),
  ],
})
export class AppModule {}
