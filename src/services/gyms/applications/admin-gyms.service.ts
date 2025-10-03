import { Injectable } from '@nestjs/common';
import { DddService } from '@libs/ddd';
import { GymsRepository } from '../repository/gyms.repository';
import { Transactional } from '@libs/decorators';
import { Gym } from '../domain/gyms.entity';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class AdminGymsService extends DddService {
  constructor(private readonly gymsRepository: GymsRepository) {
    super();
  }

  @Transactional()
  async register({ name, address }: { name: string; address: string }) {
    const [existingGym] = await this.gymsRepository.find({ name });

    if (existingGym) {
      throw new BadRequestException(`이미 존재하는 암장(${name})입니다.`, {
        cause: `이미 존재하는 암장(${name})입니다.`,
      });
    }

    const gym = new Gym({ name, address });
    await this.gymsRepository.save([gym]);
  }
}
