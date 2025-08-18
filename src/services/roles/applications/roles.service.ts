import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { RolesRepository } from '../repository/roles.repository';
import { Transactional } from '../../../libs/decorators';
import { Role } from '../domain/roles.entity';
@Injectable()
export class RolesService extends DddService {
  constructor(private readonly rolesRepository: RolesRepository) {
    super();
  }

  @Transactional()
  async createRole() {
    console.log('hi');
    const role = new Role();
    await this.rolesRepository.save([role]);
  }
}
