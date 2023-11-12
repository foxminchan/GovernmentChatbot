import fs from 'fs';
import { Injectable, Logger } from '@nestjs/common';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { TokenTextSplitter } from 'langchain/text_splitter';
import weaviate, { WeaviateClient } from 'weaviate-ts-client';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { LLMonitorHandler } from 'langchain/callbacks/handlers/llmonitor';
import { catchError, concatMap, finalize, from, map, of, tap } from 'rxjs';
import { WeaviateFilter, WeaviateStore } from 'langchain/vectorstores/weaviate';

@Injectable()
export class LangChainService {
  private splitter: TokenTextSplitter;
  private embedder: OpenAIEmbeddings;
  private client: WeaviateClient = weaviate.client({
    scheme: process.env.WEAVIATE_SCHEME || 'https',
    host: process.env.WEAVIATE_HOST || 'localhost',
    apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || undefined),
  });
  private logger = new Logger(LangChainService.name);
  private chatModel: ChatOpenAI;
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
    this.embedder = new OpenAIEmbeddings({
      maxRetries: 3,
      timeout: 10000,
      batchSize: 1024,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    this.splitter = new TokenTextSplitter({
      encodingName: 'cl100k_base',
      chunkSize: 512,
      chunkOverlap: 128,
      keepSeparator: true,
    });
    this.chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      callbacks: [new LLMonitorHandler()],
      modelName: process.env.OPENAI_MODEL || 'gpt-3.5-turbo-instruct',
      temperature: 0,
    });
  }

  private async getWeaviateStore() {
    return await WeaviateStore.fromExistingIndex(
      this.embedder,
      this.storeConfig
    );
  }

  private getRetriever() {
    return from(this.getWeaviateStore()).pipe(
      map((store) => {
        return store.asRetriever({ k: 10 });
      })
    );
  }

  documentProcessing() {
    const dataSource = [
      { path: 'apps/api/src/assets/pdfs', type: 'pdf' },
      { path: 'apps/api/src/assets/docs', type: 'docx' },
    ];

    return from(fs.readdirSync(dataSource[0].path))
      .pipe(
        concatMap((document) => {
          return from(
            new PDFLoader(`${dataSource[0].path}/${document}`).load()
          ).pipe(
            concatMap((loadedDocument) => {
              const pageContents = loadedDocument.map((doc) => doc.pageContent);
              return from(this.splitter.createDocuments(pageContents)).pipe(
                concatMap((splittedDocument) => {
                  return from(
                    WeaviateStore.fromDocuments(
                      splittedDocument,
                      this.embedder,
                      {
                        ...this.storeConfig,
                      }
                    )
                  );
                })
              );
            }),
            tap(() =>
              this.logger.log(`Document processed successfully: ${document}`)
            ),
            catchError((error) => {
              this.logger.error('Error processing document:', document, error);
              return of(null);
            })
          );
        }),
        finalize(() => this.logger.log('All documents processed successfully.'))
      )
      .subscribe();
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
