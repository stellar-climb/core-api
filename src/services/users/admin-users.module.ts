import { Module } from '@nestjs/common';
import { AdminUsersController } from './controllers/admin-users.controller';
import { AdminUsersService } from './applications/admin-users.service';
import { UsersRepository } from './repository/users.repository';

@Module({
  controllers: [AdminUsersController],
  providers: [AdminUsersService, UsersRepository],
})
export class AdminUsersModule {}
