import {
  DataModule,
  LoggerModule,
  OpenaiModule,
  LangChainModule,
  NestCacheModule,
} from '../frameworks';
import {
  UserController,
  TopicController,
  AccountController,
  ChatHistoryController,
} from '../controllers';
import {
  HttpCacheInterceptor,
  ClearCacheInterceptor,
} from '../libs/interceptors';
import { OpenTelemetryModule } from 'nestjs-otel';
import { EventsGateway } from '../frameworks/gateway';
import { LoggerMiddleware } from '../libs/middlewares';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ThrottlerBehindProxyGuard } from '../libs/guards';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule, TopicModule, AccountModule, ChatHistoryModule } from '.';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 30,
      },
    ]),
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true,
        apiMetrics: {
          enable: true,
        },
      },
    }),
    DataModule,
    UserModule,
    TopicModule,
    OpenaiModule,
    LoggerModule,
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
      useClass: ThrottlerBehindProxyGuard,
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
