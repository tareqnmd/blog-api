import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { User } from './modules/users/user.entity';
import { UsersModule } from './modules/users/users.module';
import { TagsModule } from './modules/tags/tags.module';
import { MetaOptionsModule } from './modules/meta-options/meta-options.module';
import { Blog } from './modules/blogs/blog.entity';
import { Tag } from './modules/tags/tag.entity';
import { MetaOption } from './modules/meta-options/meta-option.entity';

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
        entities: [User, Blog, Tag, MetaOption],
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
