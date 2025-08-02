import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSlugText } from 'src/common/helper';
import { Repository } from 'typeorm';
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
  ) {}

  /**
   * Creates a new blog.
   * @param createBlogDto - The blog to create.
   * @returns A string with the blog's title.
   */
  async createBlog(createBlogDto: CreateBlogDto) {
    const blog = this.blogRepository.create(createBlogDto);
    blog.slug = generateSlugText(blog.title);
    return this.blogRepository.save(blog);
  }

  /**
   * Gets all blogs.
   * @param blogFilterDto - The filter to get blogs.
   * @returns A string with the blog's status.
   */
  async getBlogs(blogFilterDto: BlogFilterDto) {
    const query = this.blogRepository.find({
      where: {
        status: blogFilterDto.status,
      },
    });
    return query;
  }

  /**
   * Gets a blog by id.
   * @param id - The id of the blog to get.
   * @returns A string with the blog's id.
   */
  async getBlogById(id: number) {
    const blog = await this.blogRepository.findOne({
      where: {
        id,
      },
    });
    return blog;
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
  async deleteBlog(id: number) {
    const blog = await this.getBlogById(id);
    if (blog) {
      await this.blogRepository.delete(blog.id);
      return {
        message: 'Blog deleted successfully',
      };
    }
  }
}
