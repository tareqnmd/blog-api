import { ApiProperty } from '@nestjs/swagger';
import { IMeta } from 'src/modules/pagination/pagination.interface';

export class ApiResponseDto<T = any> {
  @ApiProperty({ description: 'Response data' })
  data: T | null;

  @ApiProperty({ description: 'Dynamic response message' })
  message: string | string[] | null;

  @ApiProperty({ description: 'HTTP status code' })
  status: number;

  @ApiProperty({ description: 'Indicates if this is an error response' })
  error: boolean;

  @ApiProperty({
    description: 'Meta information (pagination, etc.)',
    required: false,
  })
  meta?: IMeta;
}
