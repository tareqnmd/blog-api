import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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
import { UpdateBulkBlogStatusDto } from './dto/updateBulkBlogStatus';

/**
 * BlogsController is a controller that provides methods to create, get, update, and delete blogs.
 */
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  /**
   * Creates a new blog.
   * @param createBlogDto - The blog to create.
   * @returns A string with the blog's title.
   */
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

  /**
   * Gets a blog by id.
   * @param id - The id of the blog to get.
   * @returns A string with the blog's id.
   */
  @ApiOperation({ summary: 'Get blog' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Get(':id')
  getBlogById(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.getBlogById(id);
  }

  /**
   * Gets all blogs.
   * @param blogFilterDto - The filter to get blogs.
   * @returns A string with the blog's status.
   */
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

  /**
   * Updates a blog.
   * @param id - The id of the blog to update.
   * @param putBlogDto - The blog to update.
   * @returns A string with the blog's status.
   */
  @ApiOperation({ summary: 'Update blog' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Put(':id')
  updateBlog(
    @Param('id', ParseIntPipe) id: number,
    @Body() putBlogDto: PutBlogDto,
  ) {
    return this.blogsService.updateBlog(id, putBlogDto);
  }

  /**
   * Updates the status of multiple blogs.
   * @param ids - The ids of the blogs to update.
   * @param status - The status to update the blogs to.
   * @returns A string with the blog's status.
   */
  @ApiOperation({ summary: 'Update bulk blog status' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Patch('bulk-status')
  updateBulkBlogStatus(
    @Body() updateBulkBlogStatusDto: UpdateBulkBlogStatusDto,
  ) {
    console.log(updateBulkBlogStatusDto);
    return this.blogsService.updateBulkBlogStatus(updateBulkBlogStatusDto);
  }

  /**
   * Updates a blog status.
   * @param id - The id of the blog to update.
   * @param patchBlogDto - The blog to update.
   * @returns A string with the blog's status.
   */
  @ApiOperation({ summary: 'Update blog status' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Patch(':id')
  updatePartialBlog(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchBlogDto: PatchBlogDto,
  ) {
    return this.blogsService.updatePartialBlog(id, patchBlogDto);
  }

  /**
   * Deletes a blog.
   * @param id - The id of the blog to delete.
   * @returns A string with the blog's id.
   */
  @ApiOperation({ summary: 'Delete blog' })
  @ApiResponse({
    status: 200,
    content: {
      'application/json': {},
    },
  })
  @Delete(':id')
  deleteBlog(@Param('id', ParseIntPipe) id: number) {
    return this.blogsService.deleteBlog(id);
  }
}
