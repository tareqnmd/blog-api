import { DefaultEntity } from 'src/common/entities/base.entity';
import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Blog } from '../blogs/blog.entity';
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
    length: 96,
    nullable: true,
  })
  password?: string;

  @Column({
    type: 'enum',
    enum: UserRoles,
    nullable: false,
    default: UserRoles.VIEWER,
  })
  role: UserRoles;

  @OneToMany(() => Blog, (blog) => blog.author)
  blogs: Blog[];

  @Column({
    type: 'varchar',
    nullable: true,
  })
  googleId?: string;
}
