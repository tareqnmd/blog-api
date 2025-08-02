import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { Blog } from './blog.entity';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  providers: [BlogsService],
  controllers: [BlogsController],
  imports: [TypeOrmModule.forFeature([Blog]), UsersModule],
})
export class BlogsModule {}
