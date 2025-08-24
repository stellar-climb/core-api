import { Injectable } from '@nestjs/common';
import { Gym } from '../domain/gyms.entity';
import { DddRepository } from '@libs/ddd';

@Injectable()
export class GymsRepository extends DddRepository<Gym> {
  entity = Gym;
}
