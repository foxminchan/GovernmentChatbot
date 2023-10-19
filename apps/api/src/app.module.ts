import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import {
  AccountModule,
  ChatHistoryModule,
  TopicModule,
  UserModule,
} from './usecase';
import {
  AuthController,
  ChatHistoryController,
  TopicController,
  UserController,
} from './controllers';
import { AuthModule, DataModule, OpenaiModule } from './frameworks';
import { LoggerMiddleware } from './middlewares';
import { EventsModule } from './gateway';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 30,
      },
    ]),
    DataModule,
    OpenaiModule,
    AccountModule,
    AuthModule,
    EventsModule,
    TopicModule,
    UserModule,
    ChatHistoryModule,
    CacheModule.register({
      ttl: 60,
      max: 100,
      isGlobal: true,
    }),
  ],
  controllers: [
    TopicController,
    UserController,
    ChatHistoryController,
    AuthController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
