import { Module } from '@nestjs/common';
import { AdminGymsController } from './controllers/admin-gyms.controller';
import { AdminGymsService } from './applications/admin-gyms.service';
import { GymsRepository } from './repository/gyms.repository';

@Module({
  controllers: [AdminGymsController],
  providers: [AdminGymsService, GymsRepository],
  exports: [AdminGymsService, GymsRepository],
})
export class AdminGymsModule {}
