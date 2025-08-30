import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventBox, EventBoxStatus } from './event-box';
import { Repository } from 'typeorm';
import { QueueName } from './queues';
import { Queue } from 'bullmq';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectQueue } from '@nestjs/bullmq';

export const EVENT_BOX_CREATED = 'event-box.created';

// FIXME: 아 여기 좀 수동적으로 하기싫은데 방법 없나...
const EVENT_MAP: [string, string[]][] = [['UsersCreatedEvent', [QueueName.ROLE]]];

@Injectable()
export class EventBoxDispatcherProvider {
  // NOTE: 새로운 이벤트가 추가될 때마다 이 부분도 추가해줘야함.
  private readonly eventMap = new Map<string, string[]>(EVENT_MAP);

  // NOTE: 새로운 이벤트가 추가될 때마다 이 부분도 추가해줘야함.
  constructor(
    @InjectRepository(EventBox)
    private readonly eventBoxRepository: Repository<EventBox>,
    @InjectQueue(QueueName.ROLE) private readonly roleQueue: Queue
  ) {}

  @OnEvent(EVENT_BOX_CREATED)
  async handleEventBoxCreated(event: EventBox) {
    // step 1. 해당 이벤트 박스가 처리되지 않은 이벤트인지 확인. -> 중복 처리를 방지하기 위함.
    const [eventBox] = await this.eventBoxRepository.find({
      where: { id: event.id, eventStatus: EventBoxStatus.PENDING },
    });

    if (!eventBox) {
      return;
    }

    // step 2. 해당 이벤트 박스가 처리해야하는 큐를 찾음.
    const targetQueues = this.eventMap.get(eventBox.eventType);

    // NOTE: 여기서 추가적으로 처리해줘야하는 부분이 있나?
    if (!targetQueues || targetQueues.length === 0) {
      return;
    }

    // step 3. 해당 이벤트 박스를 처리해야하는 큐에 이벤트 박스를 추가.
    await Promise.all(
      targetQueues.map((queueName) => {
        const queue = this.getQueue(queueName);
        return queue.add(eventBox.eventType, eventBox, {
          removeOnComplete: {
            count: 100,
            age: 1 * 24 * 3600,
          },
          removeOnFail: {
            age: 7 * 24 * 3600,
          },
        });
      })
    );

    // step 4. 해당 이벤트 박스를 처리 완료 상태로 업데이트.
    await this.eventBoxRepository.update(eventBox.id, {
      eventStatus: EventBoxStatus.PROCESSED,
    });
  }

  // NOTE: 새로운 이벤트가 추가될 때마다 이 부분도 추가해줘야함.
  private getQueue(name: string): Queue {
    const queues: Record<string, Queue> = {
      [QueueName.ROLE]: this.roleQueue,
    };

    return queues[name];
  }
}
