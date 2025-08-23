import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from '../constant';

export class PaginationDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  page: number = DEFAULT_PAGINATION_PAGE;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Min(1)
  limit: number = DEFAULT_PAGINATION_LIMIT;

  @IsOptional()
  @IsBoolean()
  ignorePagination: boolean = false;
}
