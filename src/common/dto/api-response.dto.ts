import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty({ description: 'Response data' })
  data: T | null;

  @ApiProperty({ description: 'Dynamic response message' })
  message: string;

  @ApiProperty({ description: 'HTTP status code' })
  status: number;

  @ApiProperty({ description: 'Indicates if this is an error response' })
  error: boolean;

  @ApiProperty({
    description: 'Array of error messages (only present when error is true)',
    required: false,
    type: [String],
  })
  errorMessages?: string[];
}
