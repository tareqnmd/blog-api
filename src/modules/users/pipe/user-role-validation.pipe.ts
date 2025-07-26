import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserRole } from '../enum/user-role.enum';

export class UserRoleValidationPipe implements PipeTransform {
  readonly allowedRoles = [UserRole.ADMIN, UserRole.USER];

  transform(value: UserRole) {
    if (!this.isRoleValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid role`);
    }
    return value;
  }

  private isRoleValid(role: UserRole) {
    const idx = this.allowedRoles.indexOf(role);
    return idx !== -1;
  }
}
