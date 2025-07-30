import { Injectable } from '@nestjs/common';
import { BlogFilterDto } from './dto/blog-filter.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PatchBlogDto } from './dto/patch-blog.dto';
import { PutBlogDto } from './dto/put-blog.dto';

@Injectable()
export class BlogsService {
  createBlog(createBlogDto: CreateBlogDto) {
    return `Blog ${createBlogDto.title} created`;
  }

  getBlogs(blogFilterDto: BlogFilterDto) {
    return `Blogs filtered by ${blogFilterDto.status}`;
  }

  getBlogById(id: string) {
    return `Blog ${id} fetched`;
  }

  updateBlog(id: string, putBlogDto: PutBlogDto) {
    return `Blog ${id} updated by ${putBlogDto.status}`;
  }

  updateBlogStatus(id: string, patchBlogDto: PatchBlogDto) {
    return `Blog ${id} updated by ${patchBlogDto.status}`;
  }

  deleteBlog(id: string) {
    return `Blog ${id} deleted`;
  }
}
