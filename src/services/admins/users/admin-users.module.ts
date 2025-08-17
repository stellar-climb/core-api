import { Module } from '@nestjs/common';
import { AdminUsersController } from './controllers/admin-users.controller';

@Module({
  controllers: [AdminUsersController],
})
export class AdminUsersModule {}
