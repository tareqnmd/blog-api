import { PartialType } from '@nestjs/swagger';
import { CreateBlogDto } from './create-blog.dto';

export class PatchBlogDto extends PartialType(CreateBlogDto) {}
