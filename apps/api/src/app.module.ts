import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ChatHistoryModule, TopicModule, UserModule } from './usecase';
import { TopicController, UserController } from './controllers';
import { DataModule } from './frameworks';
import { LoggerMiddleware } from './middlewares';
import { ChatHistoryController } from './controllers/chat-history.controller';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 30,
      },
    ]),
    DataModule,
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
