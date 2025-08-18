import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { User } from '../../users/domain/users.entity';

export enum RoleType {
  ADMIN = 'admin',
  GENERAL = 'general',
}

@Entity()
export class Role extends DddAggregate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: RoleType })
  type!: RoleType;

  @OneToOne(() => User, (user) => user.role)
  user!: User;

  constructor() {
    super();
  }
}
