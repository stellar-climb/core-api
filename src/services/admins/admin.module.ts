import { Module } from '@nestjs/common';
import { AdminUsersModule } from './users/admin-users.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    AdminUsersModule,
    RouterModule.register([
      {
        path: '/admins',
        module: AdminUsersModule,
      },
    ]),
  ],
})
export class AdminModule {}
