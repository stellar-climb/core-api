import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { User } from '../domain/users.entity';

@Injectable()
export class UsersRepository extends DddRepository<User> {
  entity = User;

  async find() {
    return this.getManager.find(this.entity, {
      where: {},
    });
  }
}
