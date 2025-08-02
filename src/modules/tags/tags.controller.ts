import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @Get()
  getTags() {
    return this.tagsService.getTags();
  }

  @Get(':id')
  getTagById(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.getTagById(id);
  }

  @Put(':id')
  updateTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.updateTag(id, updateTagDto);
  }

  @Delete(':id')
  deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.deleteTag(id);
  }

  @Delete(':id/soft')
  softDeleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagsService.softDeleteTag(id);
  }
}
