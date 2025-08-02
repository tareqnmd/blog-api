import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async createTag(createTagDto: CreateTagDto) {
    const newTag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(newTag);
  }

  async getTags() {
    return this.tagRepository.find();
  }

  async getTagById(id: number) {
    return this.tagRepository.findOne({ where: { id } });
  }

  async getTagsByIds(ids: number[]) {
    return this.tagRepository.find({ where: { id: In(ids) } });
  }

  async updateTag(id: number, updateTagDto: UpdateTagDto) {
    const tag = await this.getTagById(id);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return this.tagRepository.save({ ...tag, ...updateTagDto });
  }

  async deleteTag(id: number) {
    const tag = await this.getTagById(id);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }
    return this.tagRepository.remove(tag);
  }
}
