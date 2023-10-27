import { Module } from '@nestjs/common';
import { ChatHistoryService } from './chat-history.service';

@Module({
  providers: [ChatHistoryService],
  exports: [ChatHistoryService],
})
export class ChatHistoryModule {}
