import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogFilterDto } from './dto/blog-filter.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PatchBlogDto } from './dto/patch-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.createBlog(createBlogDto);
  }

  @Get(':id')
  getBlogById(@Param('id') id: string) {
    return this.blogsService.getBlogById(id);
  }

  @Get()
  getBlogs(@Query() blogFilterDto: BlogFilterDto) {
    return this.blogsService.getBlogs(blogFilterDto);
  }

  @Put(':id')
  updateBlog(@Param('id') id: string, @Body() blogFilterDto: BlogFilterDto) {
    return this.blogsService.updateBlog(id, blogFilterDto);
  }

  @Patch(':id')
  updateBlogStatus(
    @Param('id') id: string,
    @Body() patchBlogDto: PatchBlogDto,
  ) {
    return this.blogsService.updateBlogStatus(id, patchBlogDto);
  }

  @Delete(':id')
  deleteBlog(@Param('id') id: string) {
    return this.blogsService.deleteBlog(id);
  }
}
