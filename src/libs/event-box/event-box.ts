import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum EventBoxStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
  FAILED = 'failed',
}

// NOTE: EventBox는 오직 transaction outbox 패턴을 위한 엔티티입니다. 그렇기에 CommonEntity를 상속하지 않습니다.
@Entity({ name: 'event_boxes' })
@Index(['eventStatus', 'createdAt'])
export class EventBox {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  traceId!: string;

  @Column({ comment: '이벤트의 타입' })
  eventType!: string;

  @Column({ type: 'mediumtext' })
  payload!: string;

  @Column({
    type: 'enum',
    enum: EventBoxStatus,
    default: EventBoxStatus.PENDING,
  })
  eventStatus!: EventBoxStatus;

  @Column()
  private occurredAt!: Date;

  @CreateDateColumn()
  private readonly createdAt!: Date;

  @UpdateDateColumn()
  private readonly updatedAt!: Date;

  constructor() {
    this.eventType = this.constructor.name;
    this.occurredAt = new Date();
  }

  static fromEvent(event: EventBox) {
    const eventBox = new EventBox();
    const { occurredAt, eventType, ...payload } = event;
    eventBox.eventType = event.constructor.name;
    eventBox.payload = JSON.stringify(payload);
    return eventBox;
  }

  setTraceId(traceId: string) {
    this.traceId = traceId;
  }
}
