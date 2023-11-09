import { Get } from '@nestjs/common';
import { LangChainService } from '../frameworks';
import { ApiController, Key } from '../libs/decorators';

@ApiController('retrieval')
export class RetrievalController {
  constructor(private readonly langChainService: LangChainService) {}

  @Get()
  @Key()
  documentProcessing() {
    return this.langChainService.documentProcessing();
  }
}
