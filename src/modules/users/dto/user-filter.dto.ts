import { Transform, TransformFnParams } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UserFilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }: TransformFnParams) => {
    return parseInt(value, 10);
  })
  limit?: number;

  @IsOptional()
  @IsNumber()
  page?: number;
}
