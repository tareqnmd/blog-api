import { DefaultEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToMany, Unique } from 'typeorm';
import { Blog } from '../blogs/blog.entity';

@Entity()
@Unique(['slug', 'name'])
export class Tag extends DefaultEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  featuredImageUrl: string;

  @ManyToMany(() => Blog, (blog) => blog.tags)
  blogs: Blog[];
}
