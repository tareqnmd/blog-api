import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BlogStatus } from '../enum/blog-status.enum';

export class BlogFilterDto {
  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;

  @IsOptional()
  @IsString()
  title?: string;
}
