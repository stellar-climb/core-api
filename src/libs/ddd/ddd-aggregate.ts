import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { isEqual } from 'lodash';
import { stripUndefined } from '../utils';
import { EventBox } from '../event-box/event-box';

export abstract class DddAggregate {
  @CreateDateColumn()
  private createdAt!: Date;

  @Column()
  private createdBy!: string;

  @UpdateDateColumn()
  private updatedAt!: Date;

  @Column()
  private updatedBy!: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date | null;

  private events: EventBox[] = [];

  setTxId(txId: string) {
    if (!this.createdBy) {
      this.createdBy = txId;
    }
    this.updatedBy = txId;
  }

  publishEvent(event: EventBox) {
    this.events.push(event);
  }

  getPublishedEvents() {
    return [...this.events];
  }

  /**
   * @param changed 변경된 obj
   * @returns 현재 객체의 changed를 비교해서 변경된 부분만 반환한다. 바뀐게 없다면 undefined 를 반환한다.
   */
  protected stripUnchanged(changed: { [key: string]: any }) {
    const compared = Object.keys(changed).reduce((acc: { [key: string]: any }, prop) => {
      const originValue = this[prop as keyof typeof this];
      const changedValue = changed[prop];
      acc[prop] = !isEqual(originValue, changedValue) ? changedValue : undefined;
      return acc;
    }, {});

    return stripUndefined(compared);
  }
}
