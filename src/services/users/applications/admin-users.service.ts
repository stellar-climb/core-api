import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../repository/users.repository';
import { User } from '../domain/users.entity';
import { Transactional } from '@libs/decorators';

@Injectable()
export class AdminUsersService extends DddService {
  constructor(private readonly usersRepository: UsersRepository) {
    super();
  }

  async list() {
    return this.usersRepository.find();
  }

  @Transactional()
  async register() {
    const user = new User();
    await this.usersRepository.save([user]);
  }
}
