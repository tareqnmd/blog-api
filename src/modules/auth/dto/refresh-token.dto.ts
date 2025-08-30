import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * RefreshTokenDto is a DTO for refreshing a token.
 */
export class RefreshTokenDto {
  /**
   * The refresh token of the user.
   */
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
