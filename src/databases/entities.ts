import { User } from '../services/users/domain/users.entity';
import { Role } from '../services/roles/domain/roles.entity';
import { EventBox } from '../libs/event-box/event-box';

export default [EventBox, User, Role];
