import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMetaOptionsDto } from './dto/create-meta-options.dto';
import { MetaOptionsService } from './meta-options.service';

/**
 * @description MetaOptionsController is a controller for the MetaOptionsService
 */
@Controller('meta-options')
export class MetaOptionsController {
  /**
   * @description Constructor for the MetaOptionsController
   * @param metaOptionsService - The service for the MetaOptionsController
   */
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  /**
   * @description Create a new meta option
   * @param createMetaOptionsDto - The DTO for the meta option
   * @returns The created meta option
   */
  @ApiOperation({ summary: 'Create a new meta option' })
  @ApiResponse({
    status: 201,
    content: { 'application/json': {} },
  })
  @Post()
  create(@Body() createMetaOptionsDto: CreateMetaOptionsDto) {
    return this.metaOptionsService.create(createMetaOptionsDto);
  }
}
