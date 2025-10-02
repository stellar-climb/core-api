import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import type { DataSourceOptions } from 'typeorm';
import type { RedisOptions } from 'ioredis';

@Injectable()
export class ConfigsService {
  constructor(private readonly configService: NestConfigService) {}

  isProd() {
    return this.configService.get<string>('NODE_ENV') === 'production';
  }

  get mysql() {
    const configs: DataSourceOptions = {
      type: 'mysql',
      host: this.configService.get<string>('MYSQL_HOST'),
      port: Number(this.configService.get<string>('MYSQL_PORT')),
      username: this.configService.get<string>('MYSQL_USERNAME'),
      password: this.configService.get<string>('MYSQL_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DATABASE'),
    };

    this.checkUndefined(configs, 'MYSQL');
    return configs;
  }

  get redis() {
    const configs: RedisOptions = {
      host: this.configService.get<string>('REDIS_HOST'),
    };

    this.checkUndefined(configs, 'REDIS');
    return configs;
  }

  get jwt() {
    const configs = {
      secret: this.configService.get<string>('JWT_SECRET'),
    };

    this.checkUndefined(configs, 'JWT');
    return configs;
  }

  get slack() {
    return {
      webhookUrl: this.configService.get<string>('SLACK_WEBHOOK_URL'),
    };
  }

  private checkUndefined(configs: Record<string, any>, name: string) {
    Object.entries(configs).forEach(([key, value]) => {
      if (value === undefined) {
        throw new InternalServerErrorException(`${name}'s ${key} environment variable is undefined.`);
      }
    });
  }
}
