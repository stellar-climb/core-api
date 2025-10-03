import { Injectable } from '@nestjs/common';
import { Gym } from '../domain/gyms.entity';
import { DddRepository } from '@libs/ddd';
import { stripUndefined } from '@libs/utils';

@Injectable()
export class GymsRepository extends DddRepository<Gym> {
  entity = Gym;

  async find(condition: { name?: string }) {
    return this.getManager.find(this.entity, {
      where: {
        ...stripUndefined({
          name: condition.name,
        }),
      },
    });
  }

  async count(condition: { name?: string }) {
    return this.getManager.count(this.entity, {
      where: {
        ...stripUndefined({ name: condition.name }),
      },
    });
  }
}
