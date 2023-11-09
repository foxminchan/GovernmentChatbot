import { Body, Get, Post } from '@nestjs/common';
import { LangChainService, OpenaiService } from '../frameworks';
import { ApiController, Key, SwaggerResponse } from '../libs/decorators';

@ApiController('retrieval')
export class RetrievalController {
  constructor(
    private readonly langChainService: LangChainService,
    private readonly onpenAiService: OpenaiService
  ) {}

  @Key()
  @Get()
  @SwaggerResponse({
    operation: 'Create embedding vector',
  })
  documentProcessing() {
    return this.langChainService.documentProcessing();
  }

  @Key()
  @Post('gpt')
  @SwaggerResponse({
    operation: 'Test GPT Completion',
    body: String,
  })
  createChatCompletion(@Body('userContent') userContent: string) {
    return this.onpenAiService.createChatCompletion(userContent);
  }
}
