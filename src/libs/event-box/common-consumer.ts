import { OnWorkerEvent, WorkerHost } from '@nestjs/bullmq';
import { asyncLocalStorage, ContextKey } from '../context';
import { Job } from 'bullmq';
import { SlackService } from '../slack';
import { Inject } from '@nestjs/common';

export abstract class CommonConsumer extends WorkerHost {
  // NOTE: 추후 로거 만들면 제거하자.
  @Inject()
  private readonly slackService!: SlackService;

  protected readonly methodHandlerMap = new Map<
    string,
    (data: any) => Promise<void>
  >();

  async process(job: Job) {
    const {
      name,
      data: { payload },
    } = job;

    const handler = this.getHandler(name);
    const store = this.getContext(job);

    await asyncLocalStorage.run(store, async () => {
      await handler(JSON.parse(payload));
    });
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job, error: Error) {
    console.error(
      `[traceId: ${job.data.traceId}] ${job.data.eventType} is not success.`,
      error.stack,
    );
    if (process.env.NODE_ENV !== 'local') {
      this.slackService.sendMessage(
        `[traceId: ${job.data.traceId}] ${job.data.eventType} is not success.\n${error.stack}`,
      );
    }
  }

  private getHandler(name: string) {
    const handler = this.methodHandlerMap.get(name);

    if (!handler) {
      throw new Error(`Handler for job ${name} not found`);
    }

    return handler;
  }

  private getContext(job: Job) {
    const store = new Map();
    store.set(ContextKey.TXID, job.data.traceId);

    return store;
  }
}
