import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetaOptionsDto } from './dto/create-meta-options.dto';
import { MetaOption } from './meta-option.entity';

/**
 * @description MetaOptionsService is a service for the MetaOptionsController
 */
@Injectable()
export class MetaOptionsService {
  /**
   * @description Constructor for the MetaOptionsService
   * @param metaOptionRepository - The repository for the MetaOption entity
   */
  constructor(
    @InjectRepository(MetaOption)
    private metaOptionRepository: Repository<MetaOption>,
  ) {}

  /**
   * @description Create a new meta option
   * @param createMetaOptionsDto - The DTO for the meta option
   * @returns The created meta option
   */
  async create(createMetaOptionsDto: CreateMetaOptionsDto) {
    const metaOption = this.metaOptionRepository.create(createMetaOptionsDto);
    const savedMetaOption = await this.metaOptionRepository.save(metaOption);
    return savedMetaOption;
  }
}
