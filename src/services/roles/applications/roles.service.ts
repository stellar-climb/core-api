import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { RolesRepository } from '../repository/roles.repository';
import { Transactional } from '../../../libs/decorators';
import { Role } from '../domain/roles.entity';
import { UsersCreatedEvent } from '../../users/domain/events';
import { EventHandler } from '@libs/decorators';

@Injectable()
export class RolesService extends DddService {
  constructor(private readonly rolesRepository: RolesRepository) {
    super();
  }

  @EventHandler(UsersCreatedEvent, {
    description: '유저가 생성되면 그에 해당하는 Role을 생성해준다.',
  })
  @Transactional()
  async createRole() {
    console.log('hi');
    const role = new Role();
    await this.rolesRepository.save([role]);
  }
}
