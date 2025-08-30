import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITokenUser } from 'src/common/interfaces/token-user.interface';
import { Repository } from 'typeorm';
import { PaginationProvider } from '../../pagination/pagination.provider';
import { TagsService } from '../../tags/tags.service';
import { Blog } from '../blog.entity';
import { BlogFilterDto } from '../dto/blog-filter.dto';
import { CreateBlogDto } from '../dto/create-blog.dto';
import { PatchBlogDto } from '../dto/patch-blog.dto';
import { PutBlogDto } from '../dto/put-blog.dto';
import { UpdateBulkBlogStatusDto } from '../dto/updateBulkBlogStatus';
import { BlogUpdateMany } from './blog-update-many.provider';
import { CreateBlogProvider } from './create-blog.provider';

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
    private readonly createBlogProvider: CreateBlogProvider,
    private readonly tagsService: TagsService,
    private readonly blogUpdateMany: BlogUpdateMany,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  /**
   * Creates a new blog.
   * @param createBlogDto - The blog to create.
   * @returns A string with the blog's title.
   */
  async createBlog(createBlogDto: CreateBlogDto, user: ITokenUser) {
    return this.createBlogProvider.createBlog(createBlogDto, user);
  }

  /**
   * Gets all blogs.
   * @param blogFilterDto - The filter to get blogs.
   * @returns A paginated list of blogs.
   */
  async getBlogs(blogFilterDto: BlogFilterDto) {
    const totalCount = await this.blogRepository.count();
    const queryBuilder = this.blogRepository
      .createQueryBuilder('blog')
      .leftJoinAndSelect('blog.author', 'author')
      .leftJoinAndSelect('blog.tags', 'tags')
      .leftJoinAndSelect('blog.metaOptions', 'metaOptions');

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

    if (blogFilterDto.startDate) {
      queryBuilder.andWhere('blog.createdAt >= :startDate', {
        startDate: blogFilterDto.startDate,
      });
    }

    if (blogFilterDto.endDate) {
      queryBuilder.andWhere('blog.createdAt <= :endDate', {
        endDate: blogFilterDto.endDate,
      });
    }

    const paginatedBlogs = await this.paginationProvider.PaginationQuery(
      {
        page: blogFilterDto.page,
        limit: blogFilterDto.limit,
        ignorePagination: blogFilterDto.ignorePagination,
      },
      queryBuilder,
      totalCount,
    );

    return {
      ...paginatedBlogs,
      meta: {
        totalItems: totalCount,
        totalPages: Math.ceil(totalCount / blogFilterDto.limit),
        currentPage: blogFilterDto.page,
        itemsPerPage: blogFilterDto.limit,
      },
    };
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
