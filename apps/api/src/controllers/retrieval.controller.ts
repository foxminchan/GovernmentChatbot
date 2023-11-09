import { Get } from '@nestjs/common';
import { LangChainService } from '../frameworks';
import { ApiController } from '../libs/decorators';

@ApiController('retrieval')
export class RetrievalController {
  constructor(private readonly langChainService: LangChainService) {}

  @Get()
  documentProcessing() {
    return this.langChainService.documentProcessing();
  }
}
