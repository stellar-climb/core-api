import { EventBox } from '@libs/event-box/event-box';

export class UsersCreatedEvent extends EventBox {
  public userId!: string;

  constructor(userId: string) {
    super();

    this.userId = userId;
  }
}
