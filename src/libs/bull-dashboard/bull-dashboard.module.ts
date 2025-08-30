import { Module } from '@nestjs/common';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import queues from '../event-box/queues';
import { AdminGuard } from '../guards';
import { UsersRepository } from '../../services/users/repository/users.repository';

@Module({
  imports: [
    BullBoardModule.forRootAsync({
      inject: [UsersRepository],
      useFactory: () => ({
        route: '/admins/bull-dashboard',
        adapter: ExpressAdapter,
        middleware: [AdminGuard],
      }),
    }),
    BullBoardModule.forFeature(
      ...queues.map((queue) => ({
        name: queue.name,
        adapter: BullMQAdapter,
      }))
    ),
  ],
})
export class BullDashboardModule {}
