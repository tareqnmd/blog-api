import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetaOptionsDto } from './dto/create-meta-options.dto';
import { MetaOption } from './meta-option.entity';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>,
  ) {}

  async create(createMetaOptionsDto: CreateMetaOptionsDto) {
    const metaOption = this.metaOptionRepository.create(createMetaOptionsDto);
    return this.metaOptionRepository.save(metaOption);
  }
}
