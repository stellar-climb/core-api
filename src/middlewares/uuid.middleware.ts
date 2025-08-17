import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class UuidMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const txId = req.get('x-request-id') || uuidv7();
    next();
  }
}
