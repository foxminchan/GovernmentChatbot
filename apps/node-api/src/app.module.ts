import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ChatHistoryModule, TopicModule, UserModule } from './usecase';
import {
  ChatHistoryController,
  TopicController,
  UserController,
} from './controllers';
import { DataModule, NestCacheModule, OpenaiModule } from './frameworks';
import { LoggerMiddleware } from './middlewares';
import { EventsGateway } from './gateway';
import { ClearCacheInterceptor, HttpCacheInterceptor } from './interceptors';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 30,
      },
    ]),
    NestCacheModule,
    ChatHistoryModule,
    DataModule,
    OpenaiModule,
    TopicModule,
    UserModule,
  ],
  controllers: [TopicController, UserController, ChatHistoryController],
  providers: [
    EventsGateway,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClearCacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
