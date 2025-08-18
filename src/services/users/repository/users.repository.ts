import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { User } from '../domain/users.entity';
import { stripUndefined } from '@libs/utils';

@Injectable()
export class UsersRepository extends DddRepository<User> {
  entity = User;

  async find(condition: { email?: string }) {
    return this.getManager.find(this.entity, {
      where: {
        ...stripUndefined({
          email: condition.email,
        }),
      },
    });
  }

  async count(condition: { email?: string }) {
    return this.getManager.count(this.entity, {
      where: {
        ...stripUndefined({
          email: condition.email,
        }),
      },
    });
  }
}
