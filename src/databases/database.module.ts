import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigsModule, ConfigsService } from '@configs';
import entities from './entities';
import { DataSource } from 'typeorm';
import { BullModule } from '@nestjs/bullmq';

const isLocal = process.env.NODE_ENV !== 'production';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigsModule],
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => ({
        ...configsService.mysql,
        synchronize: true,
        logging: false,
        entities,
      }),
    }),
    BullModule.forRootAsync({
      imports: [ConfigsModule],
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => ({
        connection: {
          host: configsService.redis.host || 'localhost',
          port: 6379,
          ...(isLocal ? {} : { tls: {} }),
        },
      }),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      console.log('Mysql Database is initialized.');
    } else {
      console.log('Mysql Database is not initialized.');
    }
  }
}
