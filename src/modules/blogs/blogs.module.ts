import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaginationModule } from '../pagination/pagination.module';
import { TagsModule } from '../tags/tags.module';
import { UsersModule } from '../users/users.module';
import { BlogUpdateMany } from './blog-update-many.provider';
import { Blog } from './blog.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  providers: [BlogsService, BlogUpdateMany],
  controllers: [BlogsController],
  imports: [
    TypeOrmModule.forFeature([Blog]),
    UsersModule,
    TagsModule,
    PaginationModule,
  ],
})
export class BlogsModule {}
