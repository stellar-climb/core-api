import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from '@configs';
import { DatabaseModule } from './databases/database.module';
import { SlackModule } from '@libs';

@Module({
  imports: [ConfigsModule, DatabaseModule, SlackModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
