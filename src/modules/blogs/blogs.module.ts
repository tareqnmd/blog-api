import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from '../tags/tags.module';
import { UsersModule } from '../users/users.module';
import { Blog } from './blog.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  providers: [BlogsService],
  controllers: [BlogsController],
  imports: [TypeOrmModule.forFeature([Blog]), UsersModule, TagsModule],
})
export class BlogsModule {}
