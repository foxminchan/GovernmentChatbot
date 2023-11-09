import fs from 'fs';
import { Injectable } from '@nestjs/common';
import { OpenAI } from 'langchain/llms/openai';
import { from, map, mergeMap, toArray } from 'rxjs';
import { TokenTextSplitter } from 'langchain/text_splitter';
import weaviate, { WeaviateClient } from 'weaviate-ts-client';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { DocxLoader } from 'langchain/document_loaders/fs/docx';
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

  documentProcessing() {
    return from(
      [
        { file: fs.readdirSync('apps/api/src/assets/pdfs'), type: 'pdf' },
        { file: fs.readdirSync('apps/api/src/assets/docs'), type: 'doc' },
      ].map((doc) => {
        return {
          title: doc.file,
          type: doc.type,
        };
      })
    ).pipe(
      mergeMap(async (element) => {
        const loader = element.type === 'pdf' ? PDFLoader : DocxLoader;
        const result = await WeaviateStore.fromDocuments(
          await this.splitter.createDocuments(
            (
              await new loader(
                `apps/api/src/assets/${element.type}s/${element.title}`
              ).load()
            ).map((doc) => doc.pageContent)
          ),
          this.embedder,
          {
            ...this.storeConfig,
          }
        );
        return result;
      }),
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
