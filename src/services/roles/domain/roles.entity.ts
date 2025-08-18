import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { User } from '../../users/domain/users.entity';

export enum RoleType {
  ADMIN = 'admin',
  GENERAL = 'general',
}

type Ctor = {
  type: RoleType;
  userId: string;
};

@Entity()
export class Role extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: RoleType })
  type!: RoleType;

  @Column()
  userId!: string;

  @OneToOne(() => User, (user) => user.role)
  @JoinColumn({ name: 'userId' })
  user!: User;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.type = args.type;
      this.userId = args.userId;
    }
  }
}
