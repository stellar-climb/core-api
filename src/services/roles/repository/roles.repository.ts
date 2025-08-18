import { Injectable } from '@nestjs/common';
import { DddRepository } from '@libs/ddd';
import { Role } from '../domain/roles.entity';

@Injectable()
export class RolesRepository extends DddRepository<Role> {
  entity = Role;
}
