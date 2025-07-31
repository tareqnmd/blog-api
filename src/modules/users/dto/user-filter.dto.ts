import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
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
  @IsString()
  name?: string;

  /**
   * The email of the user.
   */
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
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
