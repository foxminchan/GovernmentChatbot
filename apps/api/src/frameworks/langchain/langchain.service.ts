import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';

@Injectable()
export class LangChainService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }
}
