import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigsModule } from '@configs';
import { DatabaseModule } from './databases/database.module';
import { SlackModule } from '@libs/slack';
import { GlobalRouterModule } from './services/global-router.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContextMiddleware, UuidMiddleware } from '@middlewares';
import { ContextModule } from '@libs/context';

@Module({
  imports: [
    ConfigsModule,
    DatabaseModule,
    SlackModule,
    GlobalRouterModule,
    ContextModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware, UuidMiddleware).forRoutes('*');
  }
}
