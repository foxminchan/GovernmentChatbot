import { Injectable } from '@nestjs/common';

@Injectable()
export class HuggingFaceService {
  private instance = null;
  private readonly task = 'text-classification';
  private readonly model =
    'Xenova/distilbert-base-uncased-finetuned-sst-2-english';

  async getInstance(progress_callback = null) {
    if (this.instance === null) {
      const { pipeline } = await import('@xenova/transformers');
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }

  async getClassification(text: string) {
    const { default: classifier } = await this.getInstance();
    const response = await classifier(text);
    return response;
  }
}
