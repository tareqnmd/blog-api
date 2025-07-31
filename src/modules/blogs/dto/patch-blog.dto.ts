import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';

/**
 * PatchBlogDto is a DTO for patching a blog.
 */
export class PatchBlogDto extends PartialType(CreateBlogDto) {}
