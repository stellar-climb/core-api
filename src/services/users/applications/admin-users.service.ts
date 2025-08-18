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
    return this.usersRepository.find({});
  }

  @Transactional()
  async register({ email, password }: { email: string; password: string }) {
    const [duplicatedUser] = await this.usersRepository.find({ email });

    if (duplicatedUser) {
      throw new BadRequestException(`이미 ${email} 이메일로 가입된 유저가 있습니다.`, {
        cause: '해당 이메일은 이미 가입된 계정입니다.',
      });
    }

    const user = User.of({
      email,
      password,
      confirmPassword: password,
    });

    await this.usersRepository.save([user]);
  }
}
