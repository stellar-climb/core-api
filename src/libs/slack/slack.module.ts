import { Module } from '@nestjs/common';
import { ConfigsService } from '@configs';
import { IncomingWebhook } from '@slack/webhook';
import { SlackService } from './slack.service';

@Module({
  providers: [
    {
      provide: 'SLACK_CLIENT',
      inject: [ConfigsService],
      useFactory: (configsService: ConfigsService) => {
        return new IncomingWebhook(configsService.slack.webhookUrl ?? '');
      },
    },
    SlackService,
  ],
  exports: [SlackService],
})
export class SlackModule {}
