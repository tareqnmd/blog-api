import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UserFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  page?: number;
}
