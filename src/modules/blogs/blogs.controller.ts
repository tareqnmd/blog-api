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
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BlogsService } from './blogs.service';
import { BlogFilterDto } from './dto/blog-filter.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PatchBlogDto } from './dto/patch-blog.dto';
import { PutBlogDto } from './dto/put-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @ApiOperation({ summary: 'Create blog' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Post()
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.createBlog(createBlogDto);
  }

  @ApiOperation({ summary: 'Get blog' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Get(':id')
  getBlogById(@Param('id') id: string) {
    return this.blogsService.getBlogById(id);
  }

  @ApiOperation({ summary: 'Get all blogs' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Get()
  getBlogs(@Query() blogFilterDto: BlogFilterDto) {
    return this.blogsService.getBlogs(blogFilterDto);
  }

  @ApiOperation({ summary: 'Update blog' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Put(':id')
  updateBlog(@Param('id') id: string, @Body() putBlogDto: PutBlogDto) {
    return this.blogsService.updateBlog(id, putBlogDto);
  }

  @ApiOperation({ summary: 'Update blog status' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Patch(':id')
  updateBlogStatus(
    @Param('id') id: string,
    @Body() patchBlogDto: PatchBlogDto,
  ) {
    return this.blogsService.updateBlogStatus(id, patchBlogDto);
  }

  @ApiOperation({ summary: 'Delete blog' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Delete(':id')
  deleteBlog(@Param('id') id: string) {
    return this.blogsService.deleteBlog(id);
  }
}
