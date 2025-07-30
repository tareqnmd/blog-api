import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateBlogDto } from './create-blog.dto';

export class PutBlogDto extends CreateBlogDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  id: string;
}
