import { Module } from '@nestjs/common';
import { ConfigsModule } from '@configs';
import { DatabaseModule } from './databases/database.module';
import { SlackModule } from '@libs';
import { GlobalRouterModule } from './services/global-router.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigsModule, DatabaseModule, SlackModule, GlobalRouterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
