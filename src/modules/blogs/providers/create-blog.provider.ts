import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { generateSlugText } from 'src/common';
import { ITokenUser } from 'src/common/interfaces/token-user.interface';
import { TagsService } from 'src/modules/tags/tags.service';
import { UsersService } from 'src/modules/users/provider/users.service';
import { Repository } from 'typeorm';
import { Blog } from '../blog.entity';
import { CreateBlogDto } from '../dto/create-blog.dto';

@Injectable()
export class CreateBlogProvider {
  constructor(
    private readonly tagsService: TagsService,
    private readonly usersService: UsersService,
    private readonly blogRepository: Repository<Blog>,
  ) {}

  async createBlog(createBlogDto: CreateBlogDto, user: ITokenUser) {
    try {
      const tags = await this.tagsService.getTagsByIds(createBlogDto.tags);
      const author = await this.usersService.getUser(user.sub);

      const newBlog = this.blogRepository.create({
        ...createBlogDto,
        slug: generateSlugText(createBlogDto.title),
        author: author,
        tags,
      });
      const savedBlog = await this.blogRepository.save(newBlog);
      return savedBlog;
    } catch {
      throw new RequestTimeoutException('Failed to create blog');
    }
  }
}
