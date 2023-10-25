import { Module } from '@nestjs/common';
import { LangChainService } from './langchain.service';

@Module({
  providers: [LangChainService],
  exports: [LangChainService],
})
export class LangChainModule {}
