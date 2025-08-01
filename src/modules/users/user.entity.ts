import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserRoles } from './enum/user-role.enum';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    nullable: false,
  })
  roles: UserRoles;
}
