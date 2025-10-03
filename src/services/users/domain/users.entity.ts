import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { DddAggregate } from '@libs/ddd';
import { customNanoId } from '@libs/nanoid';
import { UsersCreatedEvent } from './events';
import { RoleType } from '../../roles/domain/roles.entity';
import { Role } from '../../roles/domain/roles.entity';
import { BadRequestException } from '@nestjs/common';
import { createHash } from 'crypto';

type Ctor = {
  email: string;
  password: string;
  name: string;
  roleType: RoleType;
  socialId: string;
  signUpType: SignUpType;
};

export enum SignUpType {
  GOOGLE = 'google',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

@Entity()
export class User extends DddAggregate {
  @PrimaryColumn()
  id!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  name!: string;

  @Column({ nullable: true })
  profileImageUrl?: string;

  @Column({ type: 'enum', enum: RoleType })
  roleType!: RoleType;

  @OneToOne(() => Role, (role) => role.user)
  role!: Role;

  @Column({ comment: '소셜 로그인시 고유 ID' })
  socialId!: string;

  @Column({ type: 'enum', enum: SignUpType })
  signUpType!: SignUpType;

  @Column({ type: 'enum', enum: UserStatus })
  status!: UserStatus;

  constructor(args: Ctor) {
    super();

    if (args) {
      this.id = customNanoId(10);
      this.email = args.email;
      this.password = args.password;
      this.name = args.name;
      this.roleType = args.roleType;
      this.socialId = args.socialId;
      this.signUpType = args.signUpType;
      this.status = UserStatus.ACTIVE;

      this.publishEvent(new UsersCreatedEvent(this.id, this.roleType));
    }
  }

  static of(args: {
    email: string;
    password: string;
    confirmPassword: string;
    socialId: string;
    signUpType: SignUpType;
    name: string;
  }) {
    if (args.password !== args.confirmPassword) {
      throw new BadRequestException('비밀번호가 서로 일치하지 않습니다.');
    }

    const hashedPassword = createHash('sha256').update(args.password).digest('hex');

    // NOTE: 구글 workspace 계정 만들면 그거 써야지~
    const roleType =
      args.email === 'jeangho293@gmail.com' || args.email === 'kimmogeum@gmail.com' ? RoleType.ADMIN : RoleType.GENERAL;

    return new User({
      email: args.email,
      password: hashedPassword,
      roleType,
      socialId: args.socialId,
      signUpType: args.signUpType,
      name: args.name,
    });
  }
}
