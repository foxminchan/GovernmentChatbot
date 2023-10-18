import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ChatHistoryModule, TopicModule, UserModule } from './usecase';
import {
  ChatHistoryController,
  TopicController,
  UserController,
} from './controllers';
import { DataModule, OpenaiModule } from './frameworks';
import { LoggerMiddleware } from './middlewares';

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
    TopicModule,
    UserModule,
    ChatHistoryModule,
  ],
  controllers: [TopicController, UserController, ChatHistoryController],
  providers: [
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
