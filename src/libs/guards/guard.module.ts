import { Module } from '@nestjs/common';
import { UsersRepository } from '../../services/users/repository/users.repository';
import { AdminGuard } from './admin.guard';

@Module({
  providers: [UsersRepository, AdminGuard],
  exports: [UsersRepository, AdminGuard],
})
export class GuardModule {}
