import { ContextKey } from '../context';
import { InternalServerErrorException } from '@nestjs/common';
import { DddService } from '../ddd';
import { EventBox } from '../event-box/event-box';
import { EVENT_BOX_CREATED } from '../event-box/event-box-dispatcher.provider';

export function Transactional() {
  return function (target: DddService, propertyKey: string, descriptor: PropertyDescriptor) {
    // NOTE: 적용된 메서드의 function
    const originalMethod = descriptor.value;

    descriptor.value = async function (this: DddService, ...args: any[]) {
      let result: any;

      if (!this.context || !this.entityManager) {
        throw new InternalServerErrorException('Context or Datasource instance is not existed.');
      }

      //  NOTE: 해당 방식은 무조건 transaction() 메서드가 제공하는 entityManager를 사용하여야한다. https://typeorm.io/docs/advanced-topics/transactions
      await this.entityManager.transaction(async (transactionEntityManager) => {
        this.context.set(ContextKey.ENTITY_MANAGER, transactionEntityManager);
        result = await originalMethod.apply(this, args);
        this.context.set(ContextKey.ENTITY_MANAGER, null);
      });

      // NOTE: 이벤트 박스를 꺼내서 Redis Queue로 넣어주기 위한 작업.
      const eventBoxes = this.context.get<EventBox[]>(ContextKey.EVENT_BOXES);
      if (eventBoxes && eventBoxes.length > 0) {
        eventBoxes.forEach((eventBox) => {
          this.eventEmitter.emit(EVENT_BOX_CREATED, eventBox);
        });
      }
      this.context.set<ContextKey.EVENT_BOXES>(ContextKey.EVENT_BOXES, []);

      return result;
    };
    return descriptor;
  };
}
