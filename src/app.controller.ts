import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SlackService } from '@libs';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly slackService: SlackService,
  ) {}

  @Get('/health')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/admins/health')
  getAdminsHealth(): string {
    this.slackService.sendMessage('Hello, world!');
    return this.appService.getHello();
  }
}
