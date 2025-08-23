import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common';
import { BlogStatus } from '../enum/blog-status.enum';

/**
 * BlogFilterDto is a DTO for filtering blogs.
 */
export class BlogFilterBaseDto {
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

  /**
   * The start date of the blog.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  startDate?: string;

  /**
   * The end date of the blog.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  endDate?: string;
}

export class BlogFilterDto extends IntersectionType(
  BlogFilterBaseDto,
  PaginationDto,
) {}
