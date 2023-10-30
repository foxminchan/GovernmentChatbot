import { Global, Module } from '@nestjs/common';
import { OpenaiService } from './openai.service';

@Global()
@Module({
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
