import {
  DataModule,
  LoggerModule,
  OpenaiModule,
  LangChainModule,
  NestCacheModule,
  AuthModule,
  NestCaslModule,
} from '../frameworks';
import {
  UserController,
  TopicController,
  AccountController,
  ChatHistoryController,
  HealthController,
} from '../controllers';
import {
  HttpCacheInterceptor,
  ClearCacheInterceptor,
} from '../libs/interceptors';
import { OpenTelemetryModule } from 'nestjs-otel';
import { EventsGateway } from '../frameworks/gateway';
import { LoggerMiddleware } from '../libs/middlewares';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule, TopicModule, AccountModule, ChatHistoryModule } from '.';
import { TerminusModule } from '@nestjs/terminus';

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
    AuthModule,
    DataModule,
    UserModule,
    TopicModule,
    OpenaiModule,
    LoggerModule,
    AccountModule,
    NestCaslModule,
    TerminusModule,
    LangChainModule,
    NestCacheModule,
    ChatHistoryModule,
  ],
  controllers: [
    UserController,
    TopicController,
    HealthController,
    AccountController,
    ChatHistoryController,
  ],
  providers: [
    EventsGateway,
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
