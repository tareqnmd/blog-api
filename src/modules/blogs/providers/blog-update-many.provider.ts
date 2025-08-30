import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Blog } from '../blog.entity';
import { UpdateBulkBlogStatusDto } from '../dto/updateBulkBlogStatus';

@Injectable()
export class BlogUpdateMany {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Updates the status of multiple blogs.
   * @param ids - The ids of the blogs to update.
   * @param status - The status to update the blogs to.
   * @returns A string with the blog's status.
   */
  async updateBulkBlogStatus(updateBulkBlogStatusDto: UpdateBulkBlogStatusDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch {
      throw new RequestTimeoutException('Failed to connect to the database');
    }

    try {
      await queryRunner.manager.update(Blog, updateBulkBlogStatusDto.ids, {
        status: updateBulkBlogStatusDto.status,
      });
      await queryRunner.commitTransaction();
      return {
        message: 'Blogs status updated successfully',
        data: updateBulkBlogStatusDto.ids,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Failed to update blogs status', {
        description: String(error),
      });
    } finally {
      await queryRunner.release();
    }
  }
}
