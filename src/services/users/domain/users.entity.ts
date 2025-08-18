import { AfterInsert, Entity, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { customNanoId } from '@libs/nanoid';
import { UsersCreatedEvent } from './events';

@Entity()
export class User extends DddAggregate {
  @PrimaryColumn()
  id!: string;

  @AfterInsert()
  async afterInsert() {
    this.publishEvent(new UsersCreatedEvent(this.id));
  }

  constructor() {
    super();

    this.id = customNanoId(10);
  }
}
