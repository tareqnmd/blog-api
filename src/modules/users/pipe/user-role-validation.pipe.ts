import { BadRequestException, PipeTransform } from '@nestjs/common';
import { UserRoles } from '../enum/user-role.enum';

/**
 * UserRoleValidationPipe is a pipe that validates the role of a user.
 */
export class UserRoleValidationPipe implements PipeTransform {
  /**
   * The allowed roles of a user.
   */
  readonly allowedRoles = Object.values(UserRoles);

  /**
   * Transforms the role of a user.
   * @param value - The role of the user.
   * @returns The role of the user.
   */
  transform(value: UserRoles) {
    if (!this.isRoleValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid role`);
    }
    return value;
  }

  /**
   * Validates the role of a user.
   * @param role - The role of the user.
   * @returns True if the role is valid, false otherwise.
   */
  private isRoleValid(role: UserRoles) {
    const idx = this.allowedRoles.indexOf(role);
    return idx !== -1;
  }
}
