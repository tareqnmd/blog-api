import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BlogStatus } from '../enum/blog-status.enum';

/**
 * BlogFilterDto is a DTO for filtering blogs.
 */
export class BlogFilterDto {
  /**
   * The status of the blog.
   */
  @ApiProperty({
    required: false,
    enum: BlogStatus,
  })
  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;

  /**
   * The title of the blog.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;
}
