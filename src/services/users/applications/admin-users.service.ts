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

  @Transactional()
  async googleSignIn({ token }: { token: string }) {
    const { sub, email, name } = this.jwtService.decode<{ sub: string; email: string; name: string }>(token);

    const [user] = await this.usersRepository.find({ socialId: sub, signUpType: SignUpType.GOOGLE });

    let userId = user?.id || '';

    if (!user) {
      const newUser = User.of({
        email,
        password: [sub, email].join(''),
        confirmPassword: [sub, email].join(''),
        socialId: sub,
        signUpType: SignUpType.GOOGLE,
        name,
      });

      await this.usersRepository.save([newUser]);
      userId = newUser.id;
    }

    const accessToken = this.jwtService.sign({ id: userId });

    return { accessToken };
  }
}
