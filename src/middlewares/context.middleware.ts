import { Injectable, NestMiddleware } from '@nestjs/common';
import { asyncLocalStorage } from '@libs/context';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const store = new Map<string, any>();
    asyncLocalStorage.run(store, () => next());
  }
}
