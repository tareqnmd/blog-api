import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from '../pagination/pagination.module';
import { TagsModule } from '../tags/tags.module';
import { UsersModule } from '../users/users.module';
import { Blog } from './blog.entity';
import { BlogsController } from './blogs.controller';
import { BlogUpdateMany } from './providers/blog-update-many.provider';
import { BlogsService } from './providers/blogs.service';
import { CreateBlogProvider } from './providers/create-blog.provider';

@Module({
  providers: [BlogsService, BlogUpdateMany, CreateBlogProvider],
  controllers: [BlogsController],
  imports: [
    TypeOrmModule.forFeature([Blog]),
    UsersModule,
    TagsModule,
    PaginationModule,
  ],
})
export class BlogsModule {}
