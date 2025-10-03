import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { UsersRepository } from '../../users/repository/users.repository';
import { JwtService } from '@nestjs/jwt';
import { SignUpType } from '../../users/domain/users.entity';
import { User } from '../../users/domain/users.entity';
import { Transactional } from '@libs/decorators';

@Injectable()
export class AdminAuthService extends DddService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {
    super();
  }

  @Transactional()
  async createToken({ googleToken }: { googleToken: string }) {
    const { sub, email, name } = this.jwtService.decode<{ sub: string; email: string; name: string }>(googleToken);

    if (email !== 'jeangho293@gmail.com' && email !== 'kimmogeum@gmail.com') {
      throw new UnauthorizedException(`해당 계정(${email})은 관리자 계정으로 접근할 수 없습니다.`, {
        cause: '해당 계정은 관리자 계정으로 접근할 수 없습니다.',
      });
    }

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

  async accessBullDashboard() {
    const accessToken = this.jwtService.sign({ id: 'access-bull-dashboard' });

    return { accessToken };
  }
}
