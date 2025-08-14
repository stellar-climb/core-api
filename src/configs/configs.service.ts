import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';
import type { DataSourceOptions } from 'typeorm';

@Injectable()
export class ConfigsService {
  constructor(private readonly configService: NestConfigService) {}

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

  private checkUndefined(configs: Record<string, any>, name: string) {
    Object.entries(configs).forEach(([key, value]) => {
      if (value === undefined) {
        throw new InternalServerErrorException(
          `${name}'s ${key} environment variable is undefined.`,
        );
      }
    });
  }
}
