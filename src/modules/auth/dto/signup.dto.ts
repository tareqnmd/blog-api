import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * SignupDto is a DTO for signing up a user.
 */
export class SignupDto {
  /**
   * The name of the user.
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * The username of the user.
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

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
