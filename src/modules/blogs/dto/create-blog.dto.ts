import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { BlogStatus } from '../enum/blog-status.enum';

export class CreateBlogDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  content: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsEnum(BlogStatus)
  status: BlogStatus;
}
