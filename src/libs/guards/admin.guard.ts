import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Context, ContextKey } from '../context';
import { UsersRepository } from '../../services/users/repository/users.repository';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RoleType } from '../../services/roles/domain/roles.entity';
import { PUBLIC_KEY } from '../decorators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly context: Context,
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [context.getHandler(), context.getClass()]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const { id } = this.jwtService.verify<{ id: string }>(token);

    const [user] = await this.usersRepository.find({ id });

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
