import { Module } from '@nestjs/common';
import { AdminModule } from './admins/admin.module';
import { GeneralModule } from './generals/general.module';

@Module({
  imports: [AdminModule, GeneralModule],
})
export class GlobalRouterModule {}
