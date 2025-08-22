import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { SignUpType, User } from '../domain/users.entity';
import { stripUndefined } from '@libs/utils';
import { RoleType } from '../../roles/domain/roles.entity';

@Injectable()
export class UsersRepository extends DddRepository<User> {
  entity = User;

  async find(condition: { email?: string; roleType?: RoleType; socialId?: string; signUpType?: SignUpType }) {
    return this.getManager.find(this.entity, {
      where: {
        ...stripUndefined({
          email: condition.email,
          roleType: condition.roleType,
          socialId: condition.socialId,
          signUpType: condition.signUpType,
        }),
      },
    });
  }

  async count(condition: { email?: string; roleType?: RoleType; socialId?: string; signUpType?: SignUpType }) {
    return this.getManager.count(this.entity, {
      where: {
        ...stripUndefined({
          email: condition.email,
          roleType: condition.roleType,
          socialId: condition.socialId,
          signUpType: condition.signUpType,
        }),
      },
    });
  }
}
