import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { GymsRepository } from '../repository/gyms.repository';

@Injectable()
export class AdminGymsService extends DddService {
  constructor(private readonly gymsRepository: GymsRepository) {
    super();
  }
}
