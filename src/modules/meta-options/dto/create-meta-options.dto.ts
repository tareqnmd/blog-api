import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty } from 'class-validator';

export class CreateMetaOptionsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsJSON()
  value: JSON;
}
