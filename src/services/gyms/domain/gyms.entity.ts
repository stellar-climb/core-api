import { DddAggregate } from '@libs/ddd';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

type Ctor = {
  name: string;
  address: string;
};

@Entity()
export class Gym extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.name = args.name;
      this.address = args.address;
    }
  }
}
