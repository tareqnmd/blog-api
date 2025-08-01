import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { BlogStatus } from '../enum/blog-status.enum';

/**
 * CreateBlogDto is a DTO for creating a blog.
 */
export class CreateBlogDto {
  /**
   * The title of the blog.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  /**
   * The content of the blog.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  content: string;

  /**
   * The tags of the blog.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

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

  /**
   * The featured image of the blog.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @IsUrl()
  @MaxLength(255)
  featuredImage?: string;
}
