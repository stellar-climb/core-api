import { Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import type { ArgumentsHost } from '@nestjs/common';
import { Context } from '../context';
import { SlackService } from '../slack';
import type { Request, Response } from 'express';
import { ContextKey } from '../context';
import { ConfigsService } from '@configs';

@Catch()
export class ErrorExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorExceptionFilter.name);

  constructor(
    private readonly context: Context,
    private readonly slackService: SlackService,
    private readonly configsService: ConfigsService
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { statusCode, message } = this.formatException(exception);
    const errorMessage = this.errorMessage(exception, request);

    this.logger.error(errorMessage);

    if (!this.configsService.isLocal()) {
      this.slackService.sendMessage(errorMessage);
    }

    response.status(statusCode).json({ statusCode, message });
  }

  private formatException(exception: HttpException) {
    const baseResponse = { statusCode: 500, message: 'An unexpected error occurred on the server.' };

    if (exception && typeof exception.getStatus === 'function') {
      baseResponse.statusCode = exception.getStatus();
    }

    baseResponse.message = (exception.cause as string | undefined) || exception.message;

    return baseResponse;
  }

  private errorMessage(exception: HttpException, request: Request) {
    const txId = this.context.get<string>(ContextKey.TXID);
    return `[${request.method}] - ${request.url}\n[txId]: ${txId}\n${exception.stack}`;
  }
}
