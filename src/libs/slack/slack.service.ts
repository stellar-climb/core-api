import { Inject, Injectable } from '@nestjs/common';
import { IncomingWebhook } from '@slack/webhook';

@Injectable()
export class SlackService {
  constructor(@Inject('SLACK_CLIENT') private readonly slackClient: IncomingWebhook) {}

  sendMessage(message: string) {
    this.slackClient.send({
      text: message,
    });
  }
}
