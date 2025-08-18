import { EventBox } from '@libs/event-box/event-box';
import { RoleType } from '../../../roles/domain/roles.entity';

export class UsersCreatedEvent extends EventBox {
  public userId!: string;

  public roleType!: RoleType;

  constructor(userId: string, roleType: RoleType) {
    super();

    this.userId = userId;
    this.roleType = roleType;
  }
}
