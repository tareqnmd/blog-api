import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';

@Injectable()
export class BlogsService {
  createBlog(createBlogDto: CreateBlogDto) {
    return `Blog ${createBlogDto.title} created`;
  }
}
