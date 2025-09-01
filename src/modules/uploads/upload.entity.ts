import { DefaultEntity } from 'src/common';
import { Column, Entity } from 'typeorm';
import { FileTypes } from './enums/file-types.enum';

@Entity()
export class Upload extends DefaultEntity {
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  path: string;

  @Column({
    type: 'enum',
    enum: FileTypes,
    default: FileTypes.IMAGE,
    nullable: false,
  })
  type: FileTypes;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
  })
  mime: string;

  @Column({
    type: 'integer',
    nullable: false,
  })
  size: number;
}
