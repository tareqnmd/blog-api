import { DefaultEntity } from 'src/common/entities/base.entity';
import { Column, Entity, Unique } from 'typeorm';
import { UserRoles } from './enum/user-role.enum';

@Entity()
@Unique(['email'])
export class User extends DefaultEntity {
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
  role: UserRoles;
}
