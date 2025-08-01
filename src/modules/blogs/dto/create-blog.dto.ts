import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateMetaOptionsDto } from 'src/modules/meta-options/dto/create-meta-options.dto';
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

  /**
   * The published at of the blog.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  publishedAt?: Date;

  /**
   * The meta options of the blog.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMetaOptionsDto)
  metaOptions?: CreateMetaOptionsDto;
}
