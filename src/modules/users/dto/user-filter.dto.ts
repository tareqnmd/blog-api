import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  //   @IsNumber()
  limit?: number;

  @IsOptional()
  @IsNumber()
  page?: number;
}
