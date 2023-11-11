import OpenAI from 'openai';
import { Injectable } from '@nestjs/common';
import { catchError, from, map } from 'rxjs';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createChatCompletion(userContent: string) {
    return from(
      this.openai.chat.completions.create({
        messages: [{ role: 'user', content: userContent }],
        model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo-instruct',
      })
    ).pipe(
      map((chatCompletion) => chatCompletion.choices[0].message.content),
      catchError((error) => {
        throw new Error(`Failed to create chat completion: ${error.message}`);
      })
    );
  }
}
