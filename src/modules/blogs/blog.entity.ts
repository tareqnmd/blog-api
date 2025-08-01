import { DefaultEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { MetaOption } from '../meta-options/meta-option.entity';
import { User } from '../users/user.entity';
import { BlogStatus } from './enum/blog-status.enum';

@Entity()
@Unique(['slug'])
export class Blog extends DefaultEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  content: string;

  @Column({
    type: 'enum',
    enum: BlogStatus,
    nullable: false,
  })
  status: BlogStatus;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  slug: string;

  @OneToOne(() => User)
  @JoinColumn()
  author: User;

  @Column({
    type: 'simple-array',
    nullable: false,
  })
  tags: string[];

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  featuredImage?: string;

  @OneToOne(() => MetaOption)
  @JoinColumn({
    name: 'metaOptionId',
  })
  metaOptions?: MetaOption;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  publishedAt: Date;
}
