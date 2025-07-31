import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BlogStatus } from '../enum/blog-status.enum';

/**
 * BlogStatusValidationPipe is a pipe that validates the status of a blog.
 */
export class BlogStatusValidationPipe implements PipeTransform {
  /**
   * The allowed statuses of a blog.
   */
  readonly allowedStatuses = Object.values(BlogStatus);

  /**
   * Transforms the status of a blog.
   * @param value - The status of the blog.
   * @returns The status of the blog.
   */
  transform(value: BlogStatus) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  /**
   * Validates the status of a blog.
   * @param status - The status of the blog.
   * @returns True if the status is valid, false otherwise.
   */
  private isStatusValid(status: BlogStatus) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
