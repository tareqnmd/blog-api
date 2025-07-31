import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateBlogDto } from './create-blog.dto';

/**
 * PutBlogDto is a DTO for updating a blog.
 */
export class PutBlogDto extends CreateBlogDto {
  /**
   * The id of the blog.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  id: string;
}
