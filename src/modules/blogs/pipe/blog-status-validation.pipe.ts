import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BlogStatus } from '../enum/blog-status.enum';

export class BlogStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = Object.values(BlogStatus);

  transform(value: BlogStatus) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: BlogStatus) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
