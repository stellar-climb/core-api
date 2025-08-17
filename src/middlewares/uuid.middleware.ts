import { Injectable, NestMiddleware } from '@nestjs/common';
import { Context, ContextKey } from '@libs/context';
import type { Request, Response, NextFunction } from 'express';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class UuidMiddleware implements NestMiddleware {
  constructor(private readonly context: Context) {}

  use(req: Request, res: Response, next: NextFunction) {
    const txId = req.get('x-request-id') || uuidv7();
    this.context.set(ContextKey.TXID, txId);
    next();
  }
}
