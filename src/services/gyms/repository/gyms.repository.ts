import { Injectable } from '@nestjs/common';
import { Gym } from '../domain/gyms.entity';
import { DddRepository } from '@libs/ddd';
import { convertOptions, type PaginationOptions, stripUndefined } from '@libs/utils';

@Injectable()
export class GymsRepository extends DddRepository<Gym> {
  entity = Gym;

  async find(condition: { name?: string }, options?: PaginationOptions) {
    return this.getManager.find(this.entity, {
      where: {
        ...stripUndefined({
          name: condition.name,
        }),
      },
      ...convertOptions(options),
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
