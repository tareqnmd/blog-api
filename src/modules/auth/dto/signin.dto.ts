import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * SigninDto is a DTO for signing in a user.
 */
export class SigninDto {
  /**
   * The email of the user.
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  /**
   * The password of the user.
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
