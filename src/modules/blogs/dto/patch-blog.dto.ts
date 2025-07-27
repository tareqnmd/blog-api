import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from './create-blog.dto';

export class PatchBlogDto extends PartialType(CreateBlogDto) {}
