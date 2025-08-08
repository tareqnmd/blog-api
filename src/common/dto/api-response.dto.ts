import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ description: 'Response data', required: false })
  data?: T;

  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({ description: 'HTTP status code' })
  status: number;

  @ApiProperty({ description: 'Error details', required: false })
  error?: string | object;
}
