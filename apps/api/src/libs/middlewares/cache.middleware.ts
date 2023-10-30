import { Injectable } from '@nestjs/common';
import { CacheService } from '../../frameworks';
import type { NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class ClearCacheMiddleware implements NestMiddleware {
  constructor(private readonly cacheService: CacheService) {}

  async use(request: Request, _response: Response, next: NextFunction) {
    request.query?.clearCache === 'true' &&
      (await this.cacheService.resetCache());
    next();
  }
}
