import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ description: 'Response data' })
  data: T | null;

  @ApiProperty({ description: 'Response message' })
  message: string;

  @ApiProperty({ description: 'HTTP status code' })
  status: number;

  @ApiProperty({
    description: 'Array of error messages',
    required: false,
    type: [String],
  })
  errors?: string[];
}
