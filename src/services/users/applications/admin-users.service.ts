import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class AdminUsersService extends DddService {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  async list() {
    const [users, total] = await Promise.all([this.usersRepository.find({}), this.usersRepository.count({})]);

    return { items: users, total };
  }
}
