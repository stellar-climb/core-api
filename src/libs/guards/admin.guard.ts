import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Context, ContextKey } from '../context';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RoleType } from '../../services/roles/domain/roles.entity';
import { PUBLIC_KEY } from '../decorators';
import { Reflector } from '@nestjs/core';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../../services/users/domain/users.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    private readonly context: Context,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    // NOTE: auth 무효화. 로그인 같은 경우 무시하고 통과시키기 위해 사용
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const { id } = this.jwtService.verify<{ id: string }>(token);
    const [user] = await this.datasource.getRepository(User).find({ where: { id } });

    if (!user) {
      throw new UnauthorizedException(`해당 유저는 존재하지 않습니다.`);
    }

    if (user.roleType !== RoleType.ADMIN) {
      throw new ForbiddenException(`해당 유저는 관리자가 아닙니다.`, { cause: '관리자 권한이 없습니다.' });
    }

    this.context.set(ContextKey.USER, user);
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
