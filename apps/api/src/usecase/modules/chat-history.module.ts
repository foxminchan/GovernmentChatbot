import { Module } from '@nestjs/common';
import { ChatHistoryService } from '../services';

@Module({
  providers: [ChatHistoryService],
  exports: [ChatHistoryService],
})
export class ChatHistoryModule {}
