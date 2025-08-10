import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BlogStatus } from '../enum/blog-status.enum';

/**
 * CreateBlogDto is a DTO for creating a blog.
 */
export class UpdateBulkBlogStatusDto {
  /**
   * The tags of the blog.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  ids: number[];

  /**
   * The status of the blog.
   */
  @ApiProperty({
    enum: BlogStatus,
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(BlogStatus)
  status: BlogStatus;
}
