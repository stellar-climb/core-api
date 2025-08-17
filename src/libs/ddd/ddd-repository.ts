import { InjectDataSource } from '@nestjs/typeorm';
import { DddAggregate } from './ddd-aggregate';
import { DataSource } from 'typeorm';

export abstract class DddRepository<T extends DddAggregate> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  private get getManager() {
    return this.dataSource.manager;
  }

  async save(entities: T[]) {
    return this.saveEntities(entities);
  }

  private async saveEntities(entities: T[]) {
    // entities.forEach((entity) => entity.setTxId(this.getTxId()));

    await this.getManager.save(entities);
  }
}
