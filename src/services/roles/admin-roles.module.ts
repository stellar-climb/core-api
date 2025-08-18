import { Module } from '@nestjs/common';
import { RolesConsumer } from './applications/roles.consumer';
import { RolesService } from './applications/roles.service';
import { RolesRepository } from './repository/roles.repository';

@Module({
  imports: [],
  controllers: [],
  providers: [RolesService, RolesConsumer, RolesRepository],
  exports: [RolesRepository, RolesService],
})
export class AdminRolesModule {}
