import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserRoles } from '../enum/user-role.enum';

export class UserRoleValidationPipe implements PipeTransform {
  readonly allowedRoles = Object.values(UserRoles);

  transform(value: UserRoles) {
    if (!this.isRoleValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid role`);
    }
    return value;
  }

  private isRoleValid(role: UserRoles) {
    const idx = this.allowedRoles.indexOf(role);
    return idx !== -1;
  }
}
