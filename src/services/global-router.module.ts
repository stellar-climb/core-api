import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { AdminModule } from './admins/admin.module';
import { GeneralModule } from './generals/general.module';

@Module({
  imports: [AdminModule, GeneralModule],
})
export class GlobalRouterModule {}
