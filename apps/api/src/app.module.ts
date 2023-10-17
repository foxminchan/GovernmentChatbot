import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './controllers/app.controller';
import { AppService } from './controllers/app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DataModule } from './frameworks/data';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 10000,
        limit: 20,
      },
    ]),
    DataModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
