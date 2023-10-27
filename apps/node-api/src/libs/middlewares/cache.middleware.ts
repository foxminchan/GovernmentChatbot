import type { NextFunction, Request, Response } from 'express';
import type { NestMiddleware } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CacheService } from '../../frameworks';

@Injectable()
export class ClearCacheMiddleware implements NestMiddleware {
  constructor(private readonly cacheService: CacheService) {}

  async use(request: Request, _response: Response, next: NextFunction) {
    request.query?.clearCache === 'true' &&
      (await this.cacheService.resetCache());
    next();
  }
}
