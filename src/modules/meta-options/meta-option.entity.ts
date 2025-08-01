import { DefaultEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class MetaOption extends DefaultEntity {
  @Column({
    type: 'json',
    nullable: false,
  })
  value: JSON;
}
