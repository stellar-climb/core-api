import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigsModule } from '@configs';
import { DatabaseModule } from './databases/database.module';
import { SlackModule } from '@libs/slack';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContextMiddleware, UuidMiddleware } from '@middlewares';
import { ContextModule } from '@libs/context';
import admins from './services/admins';
import general from './services/general';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventBoxModule } from './libs/event-box';
import { JwtModule } from '@nestjs/jwt';
import { ConfigsService } from '@configs';
import { GuardModule } from './libs/guards/guard.module';

@Module({
  imports: [
    ConfigsModule,
    DatabaseModule,
    SlackModule,
    ContextModule,
    EventEmitterModule.forRoot(),
    EventBoxModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigsModule],
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => ({
        secret: configsService.jwt.secret,
      }),
    }),
    GuardModule,
    ...admins,
    ...general,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware, UuidMiddleware).forRoutes('*');
  }
}
