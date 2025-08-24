import { User } from '../services/users/domain/users.entity';
import { Role } from '../services/roles/domain/roles.entity';
import { EventBox } from '@libs/event-box/event-box';
import { Gym } from '../services/gyms/domain/gyms.entity';

export default [EventBox, User, Role, Gym];
