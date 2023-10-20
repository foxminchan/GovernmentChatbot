import { Global, Module } from '@nestjs/common';
import { HuggingFaceService } from './huggingface.service';

@Global()
@Module({
  providers: [HuggingFaceService],
  exports: [HuggingFaceService],
})
export class HuggingFaceModule {}
