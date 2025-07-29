import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { BlogStatus } from '../enum/blog-status.enum';

export class BlogFilterDto {
  @ApiProperty({
    required: false,
    enum: BlogStatus,
  })
  @IsOptional()
  @IsEnum(BlogStatus)
  status?: BlogStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;
}
