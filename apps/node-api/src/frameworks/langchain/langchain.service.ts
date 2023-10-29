import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import weaviate, { WeaviateClient } from 'weaviate-ts-client';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { WeaviateFilter, WeaviateStore } from 'langchain/vectorstores/weaviate';

@Injectable()
export class LangChainService {
  private openAI: OpenAI;
  private client: WeaviateClient = weaviate.client({
    scheme: process.env.WEAVIATE_SCHEME || 'https',
    host: process.env.WEAVIATE_HOST || 'localhost',
    apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || undefined),
  });
  private embedder: OpenAIEmbeddings;
  private metadataKeys: string[] = [
    'government',
    'law',
    'administrative',
    'judicial',
  ];
  private storeConfig = {
    client: this.client,
    indexName: 'Document',
    metadataKeys: this.metadataKeys,
  };

  constructor() {
    this.embedder = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      batchSize: 1024,
    });
    this.openAI = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  private async getWeaviateStore() {
    return WeaviateStore.fromExistingIndex(this.embedder, this.storeConfig);
  }

  async insertDocument(document: string[], metadata: object[]) {
    await WeaviateStore.fromTexts(
      document,
      metadata,
      this.embedder,
      this.storeConfig
    );
  }

  async queryDocument(query: string) {
    const store = await this.getWeaviateStore();
    const results = await store.similaritySearch(query);
    return results;
  }

  async deleteDocument(filter: WeaviateFilter) {
    const store = await this.getWeaviateStore();
    await store.delete({ filter });
  }

  async selfQueryRetriever(question: string) {
    const vectorStore = await this.getWeaviateStore();
    const chain = ConversationalRetrievalQAChain.fromLLM(
      this.openAI,
      vectorStore.asRetriever()
    );
    const answer = await chain.call({ question });
    return answer;
  }
}
