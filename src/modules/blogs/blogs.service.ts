import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { generateSlugText } from 'src/common/helper';
import { Repository } from 'typeorm';
import { TagsService } from '../tags/tags.service';
import { UsersService } from '../users/users.service';
import { BlogUpdateMany } from './blog-update-many.provider';
import { Blog } from './blog.entity';
import { BlogFilterDto } from './dto/blog-filter.dto';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PatchBlogDto } from './dto/patch-blog.dto';
import { PutBlogDto } from './dto/put-blog.dto';
import { UpdateBulkBlogStatusDto } from './dto/updateBulkBlogStatus';

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
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly blogUpdateMany: BlogUpdateMany,
  ) {}

  /**
   * Creates a new blog.
   * @param createBlogDto - The blog to create.
   * @returns A string with the blog's title.
   */
  async createBlog(createBlogDto: CreateBlogDto) {
    const author = await this.usersService.getUser(1);
    const tags = await this.tagsService.getTagsByIds(createBlogDto.tags);
    const newBlog = this.blogRepository.create({
      ...createBlogDto,
      slug: generateSlugText(createBlogDto.title),
      author,
      tags,
    });
    const savedBlog = await this.blogRepository.save(newBlog);
    return savedBlog;
  }

  /**
   * Gets all blogs.
   * @param blogFilterDto - The filter to get blogs.
   * @returns A string with the blog's status.
   */
  async getBlogs(blogFilterDto: BlogFilterDto) {
    const queryBuilder = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.author', 'author')
      .leftJoinAndSelect('blog.tags', 'tags')
      .leftJoinAndSelect('blog.metaOptions', 'metaOptions');

    if (!blogFilterDto.ignorePagination) {
      queryBuilder.take(blogFilterDto.limit);
      queryBuilder.skip(blogFilterDto.page);
    }

    if (blogFilterDto.status) {
      queryBuilder.andWhere('blog.status = :status', {
        status: blogFilterDto.status,
      });
    }

    if (blogFilterDto.title) {
      queryBuilder.andWhere('blog.title LIKE :title', {
        title: `%${blogFilterDto.title}%`,
      });
    }

    const blogs = await queryBuilder.getMany();
    return blogs;
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
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  /**
   * Updates a blog.
   * @param id - The id of the blog to update.
   * @param putBlogDto - The blog to update.
   * @returns A string with the blog's status.
   */
  async updateBlog(id: number, putBlogDto: PutBlogDto) {
    const blog = await this.getBlogById(id);
    const tags = await this.tagsService.getTagsByIds(putBlogDto.tags);
    const updatedBlog = await this.blogRepository.save({
      ...blog,
      ...putBlogDto,
      tags,
    });
    return updatedBlog;
  }

  /**
   * Updates a blog status.
   * @param id - The id of the blog to update.
   * @param patchBlogDto - The blog to update.
   * @returns A string with the blog's status.
   */
  async updatePartialBlog(id: number, patchBlogDto: PatchBlogDto) {
    const blog = await this.getBlogById(id);
    const tags = patchBlogDto.tags
      ? await this.tagsService.getTagsByIds(patchBlogDto.tags)
      : blog.tags;
    const updatedBlog = await this.blogRepository.save({
      ...blog,
      ...patchBlogDto,
      tags,
    });
    return updatedBlog;
  }

  /**
   * Deletes a blog.
   * @param id - The id of the blog to delete.
   * @returns A string with the blog's id.
   */
  async deleteBlog(id: number) {
    const blog = await this.getBlogById(id);
    await this.blogRepository.delete(blog.id);
    return {
      message: 'Blog deleted successfully',
    };
  }

  /**
   * Updates the status of multiple blogs.
   * @param ids - The ids of the blogs to update.
   * @param status - The status to update the blogs to.
   * @returns A string with the blog's status.
   */
  async updateBulkBlogStatus(updateBulkBlogStatusDto: UpdateBulkBlogStatusDto) {
    return await this.blogUpdateMany.updateBulkBlogStatus(
      updateBulkBlogStatusDto,
    );
  }
}
