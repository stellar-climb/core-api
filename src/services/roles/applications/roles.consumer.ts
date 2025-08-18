import { Processor } from '@nestjs/bullmq';
import { QueueName } from '@libs/event-box/queues';
import { CommonConsumer } from '@libs/event-box';
import { RolesService } from './roles.service';
import { UsersCreatedEvent } from '../../users/domain/events';

@Processor(QueueName.ROLE)
export class RolesConsumer extends CommonConsumer {
  constructor(private readonly rolesService: RolesService) {
    super();

    this.methodHandlerMap.set(
      UsersCreatedEvent.name,
      this.rolesService.createRole.bind(this.rolesService)
    );
  }
}
