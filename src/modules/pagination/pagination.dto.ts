import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from '../../common/constant';

export class PaginationDto {
  @ApiProperty({ required: false, default: DEFAULT_PAGINATION_PAGE })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  page: number = DEFAULT_PAGINATION_PAGE;

  @ApiProperty({ required: false, default: DEFAULT_PAGINATION_LIMIT })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit: number = DEFAULT_PAGINATION_LIMIT;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  ignorePagination: boolean = false;
}
