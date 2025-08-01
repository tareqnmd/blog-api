import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

/**
 * UserFilterDto is a DTO for filtering users.
 */
export class UserFilterDto {
  /**
   * The name of the user.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  @IsString()
  name?: string;

  /**
   * The email of the user.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(96)
  @IsEmail()
  email?: string;

  /**
   * The limit of the users.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  limit?: number;

  /**
   * The page of the users.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsPositive()
  page?: number;
}
