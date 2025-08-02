import { DefaultEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Blog } from '../blogs/blog.entity';

@Entity()
export class MetaOption extends DefaultEntity {
  @Column({
    type: 'json',
    nullable: false,
  })
  value: JSON;

  @OneToOne(() => Blog, (blog) => blog.metaOptions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  blog: Blog;
}
