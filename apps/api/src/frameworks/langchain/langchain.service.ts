import { from, map } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import weaviate, { WeaviateClient } from 'weaviate-ts-client';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { WeaviateFilter, WeaviateStore } from 'langchain/vectorstores/weaviate';

@Injectable()
export class LangChainService {
  private openAI: OpenAI;
  private embedder: OpenAIEmbeddings;
  private client: WeaviateClient = weaviate.client({
    scheme: process.env.WEAVIATE_SCHEME || 'https',
    host: process.env.WEAVIATE_HOST || 'localhost',
    apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || undefined),
  });
  private metadataKeys: string[] = [
    'government',
    'law',
    'administrative',
    'judicial',
  ];
  private storeConfig = {
    client: this.client,
    indexName: process.env.WEAVIATE_INDEX_NAME,
    metadataKeys: this.metadataKeys,
  };

  constructor() {
    this.embedder = new OpenAIEmbeddings({
      maxRetries: 3,
      batchSize: 1024,
      timeout: 10000,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.openAI = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  private async getWeaviateStore() {
    return WeaviateStore.fromExistingIndex(this.embedder, this.storeConfig);
  }

  private async getRetriever() {
    return from(this.getWeaviateStore()).pipe(
      map((store) => {
        return store.asRetriever({ k: 10 });
      })
    );
  }

  // private createRetrieverChain(llm: BaseLanguageModel, retriever: Runnable) {}

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
    return from(store.similaritySearch(query)).pipe(
      map((results) => {
        return results;
      })
    );
  }

  async deleteDocument(filter: WeaviateFilter) {
    const store = await this.getWeaviateStore();
    await store.delete({ filter });
  }
}
