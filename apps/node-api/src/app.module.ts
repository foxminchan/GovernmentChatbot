import {
  ClearCacheInterceptor,
  HttpCacheInterceptor,
} from './libs/interceptors';
import {
  AccountController,
  ChatHistoryController,
  TopicController,
  UserController,
} from './controllers';
import {
  AccountModule,
  ChatHistoryModule,
  TopicModule,
  UserModule,
} from './modules';
import { EventsGateway } from './frameworks/gateway';
import { LoggerMiddleware } from './libs/middlewares';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import {
  // AuthModule,
  DataModule,
  NestCacheModule,
  OpenaiModule,
} from './frameworks';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 30,
      },
    ]),
    // AuthModule,
    DataModule,
    UserModule,
    TopicModule,
    OpenaiModule,
    AccountModule,
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
