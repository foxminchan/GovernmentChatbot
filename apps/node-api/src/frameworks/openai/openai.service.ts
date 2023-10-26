import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async createChatCompletion(userContent: string) {
    try {
      const chatCompletion = await this.openai.chat.completions.create({
        messages: [{ role: 'user', content: userContent }],
        model: 'gpt-3.5-turbo',
      });
      return chatCompletion.choices[0].message.content;
    } catch (error) {
      throw new Error('Failed to create chat completion: ' + error.message);
    }
  }
}