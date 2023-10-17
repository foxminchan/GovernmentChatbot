import { Module } from '@nestjs/common';
import { TopicService } from '../services';

@Module({
  providers: [TopicService],
  exports: [TopicService],
})
export class TopicModule {}
