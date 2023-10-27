import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(
    _req: FastifyRequest['raw'],
    _res: FastifyReply['raw'],
    next: () => void
  ) {
    Logger.log('Request...');
    next();
  }
}
