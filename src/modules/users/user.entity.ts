import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserRoles } from './enum/user-role.enum';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  roles: UserRoles;
}
