import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { ChainValues } from 'langchain/dist/schema';
import { Chroma } from 'langchain/vectorstores/chroma';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

@Injectable()
export class LangChainService {
  private openAI: OpenAI;

  constructor() {
    this.openAI = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  async runQA(question: string, collection?: string): Promise<ChainValues> {
    const vectorStore = await Chroma.fromExistingCollection(
      new OpenAIEmbeddings(),
      { collectionName: collection ?? 'vietnamese-gov-laws' }
    );

    const chain = ConversationalRetrievalQAChain.fromLLM(
      this.openAI,
      vectorStore.asRetriever()
    );

    const answer = await chain.call({ question });

    return answer;
  }
}
