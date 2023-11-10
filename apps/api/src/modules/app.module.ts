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
  RetrievalController,
} from '../controllers';
import {
  HttpCacheInterceptor,
  ClearCacheInterceptor,
} from '../libs/interceptors';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { OpenTelemetryModule } from 'nestjs-otel';
import { TerminusModule } from '@nestjs/terminus';
import { ThrottlerModule } from '@nestjs/throttler';
import { SocketGateway } from '../frameworks/socket';
import { LoggerMiddleware } from '../libs/middlewares';
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
    RetrievalController,
    ChatHistoryController,
  ],
  providers: [
    SocketGateway,
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
