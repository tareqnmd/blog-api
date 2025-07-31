import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

/**
 * PatchUserDto is a DTO for patching a user.
 */
export class PatchUserDto extends PartialType(CreateUserDto) {}
