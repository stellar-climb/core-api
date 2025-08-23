import { Module } from '@nestjs/common';
import { UsersRepository } from '../users/repository/users.repository';
import { AdminAuthController } from './controllers/admin-auth.controller';
import { AdminAuthService } from './applications/admin-auth.service';

@Module({
  controllers: [AdminAuthController],
  providers: [UsersRepository, AdminAuthService],
})
export class AdminAuthModule {}
