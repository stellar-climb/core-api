import { Module } from '@nestjs/common';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import queues from '../event-box/queues';

@Module({
  imports: [
    BullBoardModule.forRoot({
      route: '/admins/bull-dashboard',
      adapter: ExpressAdapter,
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
