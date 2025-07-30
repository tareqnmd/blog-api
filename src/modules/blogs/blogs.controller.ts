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
import { ApiOperation } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { BlogFilterDto } from './dto/blog-filter.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PatchBlogDto } from './dto/patch-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiOperation({ summary: 'Create blog' })
  @Post()
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.createBlog(createBlogDto);
  }

  @ApiOperation({ summary: 'Get blog' })
  @Get(':id')
  getBlogById(@Param('id') id: string) {
    return this.blogsService.getBlogById(id);
  }

  @ApiOperation({ summary: 'Get all blogs' })
  @Get()
  getBlogs(@Query() blogFilterDto: BlogFilterDto) {
    return this.blogsService.getBlogs(blogFilterDto);
  }

  @ApiOperation({ summary: 'Update blog' })
  @Put(':id')
  updateBlog(@Param('id') id: string, @Body() blogFilterDto: BlogFilterDto) {
    return this.blogsService.updateBlog(id, blogFilterDto);
  }

  @ApiOperation({ summary: 'Update blog status' })
  @Patch(':id')
  updateBlogStatus(
    @Param('id') id: string,
    @Body() patchBlogDto: PatchBlogDto,
  ) {
    return this.blogsService.updateBlogStatus(id, patchBlogDto);
  }

  @ApiOperation({ summary: 'Delete blog' })
  @Delete(':id')
  deleteBlog(@Param('id') id: string) {
    return this.blogsService.deleteBlog(id);
  }
}
