import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { Body, Get, Post } from '@nestjs/common';
import { DocumentFileType } from '../libs/@types/enums';
import { LangChainService, OpenaiService } from '../frameworks';
import { ApiController, Key, SwaggerResponse } from '../libs/decorators';

@ApiController('retrieval')
export class RetrievalController {
  constructor(
    private readonly onpenAiService: OpenaiService,
    private readonly langChainService: LangChainService
  ) {}

  @Key()
  @Get()
  @SwaggerResponse({
    operation: 'Create embedding vector',
  })
  documentProcessing() {
    return from([DocumentFileType.PDF, DocumentFileType.DOC])
      .pipe(
        concatMap(async (fileType) =>
          this.langChainService.documentProcessing(fileType)
        )
      )
      .subscribe();
  }

  @Key()
  @Post('gpt')
  @SwaggerResponse({
    operation: 'Test GPT Completion',
    body: String,
  })
  createChatCompletion(@Body() userContent: string) {
    return this.onpenAiService.createChatCompletion(userContent);
  }
}
