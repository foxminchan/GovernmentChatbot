import {
  UserModule,
  TopicModule,
  AccountModule,
  ChatHistoryModule,
} from './modules';
import {
  UserController,
  TopicController,
  AccountController,
  ChatHistoryController,
} from './controllers';
import {
  DataModule,
  OpenaiModule,
  VectorModule,
  LangChainModule,
  NestCacheModule,
} from './frameworks';
import {
  ClearCacheInterceptor,
  HttpCacheInterceptor,
} from './libs/interceptors';
import { EventsGateway } from './frameworks/gateway';
import { LoggerMiddleware } from './libs/middlewares';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 30,
      },
    ]),
    DataModule,
    UserModule,
    TopicModule,
    OpenaiModule,
    VectorModule,
    AccountModule,
    LangChainModule,
    NestCacheModule,
    ChatHistoryModule,
  ],
  controllers: [
    UserController,
    TopicController,
    AccountController,
    ChatHistoryController,
  ],
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
