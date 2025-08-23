import { BadRequestException, Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../repository/users.repository';
import { SignUpType, User } from '../domain/users.entity';
import { Transactional } from '@libs/decorators';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminUsersService extends DddService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  async list() {
    return this.usersRepository.find({});
  }
}
