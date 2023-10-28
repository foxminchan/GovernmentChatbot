import { Post, Body } from '@nestjs/common';
import { VectorService } from '../frameworks';
import { ApiController, SwaggerResponse } from '../libs/decorators';

@ApiController('vector')
export class EmbeddingController {
  constructor(private readonly vectorService: VectorService) {}

  @Post('embeddings')
  @SwaggerResponse({
    operation: 'Data embedding manually',
  })
  async generateEmbeddings(@Body() documents: string[]) {
    return this.vectorService.generateEmbeddings(documents);
  }
}
