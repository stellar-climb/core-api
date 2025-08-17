import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigsModule } from '@configs';
import { DatabaseModule } from './databases/database.module';
import { SlackModule } from '@libs/slack';
import { GlobalRouterModule } from './services/global-router.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UuidMiddleware } from '@middlewares';

@Module({
  imports: [ConfigsModule, DatabaseModule, SlackModule, GlobalRouterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UuidMiddleware).forRoutes('*');
  }
}
