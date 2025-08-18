import { Entity, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { customNanoId } from '@libs/nanoid';

@Entity()
export class Role extends DddAggregate {
  @PrimaryColumn()
  id!: string;

  constructor() {
    super();

    this.id = customNanoId(10);
  }
}
