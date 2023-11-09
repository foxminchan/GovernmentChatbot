import fs from 'fs';
import { OpenAI } from 'langchain/llms/openai';
import { Injectable, Logger } from '@nestjs/common';
import { from, map, mergeMap, toArray } from 'rxjs';
import { TokenTextSplitter } from 'langchain/text_splitter';
import weaviate, { WeaviateClient } from 'weaviate-ts-client';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { WeaviateFilter, WeaviateStore } from 'langchain/vectorstores/weaviate';

@Injectable()
export class LangChainService {
  private openAI: OpenAI;
  private splitter: TokenTextSplitter;
  private embedder: OpenAIEmbeddings;
  private client: WeaviateClient = weaviate.client({
    scheme: process.env.WEAVIATE_SCHEME || 'https',
    host: process.env.WEAVIATE_HOST || 'localhost',
    apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || undefined),
  });
  private metadataKeys: string[] = [
    'law',
    'administrative',
    'jurisprudence',
    'government',
  ];
  private storeConfig = {
    type: 'document',
    client: this.client,
    indexName: process.env.WEAVIATE_INDEX_NAME,
    metadataKeys: this.metadataKeys,
  };

  constructor() {
    this.openAI = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.embedder = new OpenAIEmbeddings({
      maxRetries: 3,
      timeout: 10000,
      batchSize: 1024,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.splitter = new TokenTextSplitter({
      encodingName: 'gpt2',
      chunkSize: 512,
      chunkOverlap: 128,
      keepSeparator: true,
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

  documentProcessing() {
    return from(
      fs.readdirSync('apps/api/src/assets/pdfs').map((document) => {
        return {
          title: document,
        };
      })
    ).pipe(
      mergeMap((element) =>
        from(
          new PDFLoader('apps/api/src/assets/pdfs/' + element.title).load()
        ).pipe(
          mergeMap((loadedDocument) =>
            this.splitter.createDocuments(
              loadedDocument.map((doc) => doc.pageContent)
            )
          ),
          mergeMap((splittedDocument) =>
            WeaviateStore.fromDocuments(splittedDocument, this.embedder, {
              ...this.storeConfig,
            })
          )
        )
      ),
      toArray()
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
