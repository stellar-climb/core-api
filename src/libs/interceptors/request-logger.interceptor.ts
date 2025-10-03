import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import type { Request } from 'express';
import { type Observable, tap } from 'rxjs';
import { Context, ContextKey } from '../context';
import { Logger } from '@nestjs/common';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestLoggerInterceptor.name);

  constructor(private readonly context: Context) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const http = context.switchToHttp();
    const { method, url } = http.getRequest<Request>();

    return next
      .handle()
      .pipe(tap(() => this.logger.log(`[${method}]: ${url} - ${this.context.get<string>(ContextKey.TXID)}`)));
  }
}
