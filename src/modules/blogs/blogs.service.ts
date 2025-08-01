import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MetaOptionsService } from '../meta-options/meta-options.service';
import { Blog } from './blog.entity';
import { BlogFilterDto } from './dto/blog-filter.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PatchBlogDto } from './dto/patch-blog.dto';
import { PutBlogDto } from './dto/put-blog.dto';

/**
 * BlogsService is a service that provides methods to create, get, update, and delete blogs.
 */
@Injectable()
export class BlogsService {
  /**
   * Creates a new instance of BlogsService.
   * @param blogRepository - The repository for the Blog entity.
   */
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    private readonly metaOptionsService: MetaOptionsService,
  ) {}

  /**
   * Creates a new blog.
   * @param createBlogDto - The blog to create.
   * @returns A string with the blog's title.
   */
  async createBlog(createBlogDto: CreateBlogDto) {
    const metaOptions = createBlogDto.metaOptions
      ? await this.metaOptionsService.create(createBlogDto.metaOptions)
      : null;
    const blog = this.blogRepository.create(createBlogDto);
    if (metaOptions) {
      blog.metaOptions = metaOptions;
    }
    blog.slug = 'kkk';
    return this.blogRepository.save(blog);
  }

  /**
   * Gets all blogs.
   * @param blogFilterDto - The filter to get blogs.
   * @returns A string with the blog's status.
   */
  getBlogs(blogFilterDto: BlogFilterDto) {
    return `Blogs filtered by ${blogFilterDto.status}`;
  }

  /**
   * Gets a blog by id.
   * @param id - The id of the blog to get.
   * @returns A string with the blog's id.
   */
  getBlogById(id: string) {
    return `Blog ${id} fetched`;
  }

  /**
   * Updates a blog.
   * @param id - The id of the blog to update.
   * @param putBlogDto - The blog to update.
   * @returns A string with the blog's status.
   */
  updateBlog(id: string, putBlogDto: PutBlogDto) {
    return `Blog ${id} updated by ${putBlogDto.status}`;
  }

  /**
   * Updates a blog status.
   * @param id - The id of the blog to update.
   * @param patchBlogDto - The blog to update.
   * @returns A string with the blog's status.
   */
  updateBlogStatus(id: string, patchBlogDto: PatchBlogDto) {
    return `Blog ${id} updated by ${patchBlogDto.status}`;
  }

  /**
   * Deletes a blog.
   * @param id - The id of the blog to delete.
   * @returns A string with the blog's id.
   */
  deleteBlog(id: string) {
    return `Blog ${id} deleted`;
  }
}
