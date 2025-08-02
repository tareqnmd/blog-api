import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from './blog.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  providers: [BlogsService],
  controllers: [BlogsController],
  imports: [TypeOrmModule.forFeature([Blog])],
})
export class BlogsModule {}
