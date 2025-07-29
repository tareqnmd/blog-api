import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { BlogStatus } from '../enum/blog-status.enum';

export class CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @ApiProperty({
    enum: BlogStatus,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @IsEnum(BlogStatus)
  status: BlogStatus;
}
