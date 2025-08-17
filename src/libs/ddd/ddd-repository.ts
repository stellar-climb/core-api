import { InjectDataSource } from '@nestjs/typeorm';
import { DddAggregate } from './ddd-aggregate';
import { DataSource } from 'typeorm';
import { Context, ContextKey } from '../context';
import { EventBox } from '../event-box/event-box';

export abstract class DddRepository<T extends DddAggregate> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly context: Context,
  ) {}

  private get getManager() {
    return this.dataSource.manager;
  }

  async save(entities: T[]) {
    await this.saveEntities(entities);
    await this.saveEvents(
      entities.flatMap((entity) => entity.getPublishedEvents()),
    );
  }

  private async saveEntities(entities: T[]) {
    const txId = this.context.get<string>(ContextKey.TXID);
    entities.forEach((entity) => entity.setTxId(txId));

    await this.getManager.save(entities);
  }

  private async saveEvents(events: EventBox[]) {
    const traceId = this.context.get<string>(ContextKey.TXID);
    const eventBoxes = events.map((event) => EventBox.fromEvent(event));
    eventBoxes.forEach((event) => event.setTraceId(traceId));

    await this.getManager.save(eventBoxes);

    // NOTE: 이벤트 박스를 저장한 후, 이벤트 박스를 컨텍스트에 저장하여 이벤트 발행 시 사용.
    this.context.set(ContextKey.EVENT_BOXES, eventBoxes);
  }
}
