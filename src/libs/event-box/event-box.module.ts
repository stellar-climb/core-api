import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventBox } from './event-box';
import { EventBoxDispatcherProvider } from './event-box-dispatcher.provider';
import { BullModule } from '@nestjs/bullmq';
import queues from './queues';

@Module({
  imports: [TypeOrmModule.forFeature([EventBox]), BullModule.registerQueue(...queues)],
  providers: [EventBoxDispatcherProvider],
  exports: [EventBoxDispatcherProvider],
})
export class EventBoxModule {}
