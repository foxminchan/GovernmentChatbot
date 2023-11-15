import {
  of,
  tap,
  map,
  from,
  finalize,
  concatMap,
  takeWhile,
  Observable,
  catchError,
  Subscription,
} from 'rxjs';
import fs from 'fs';
import weaviate from 'weaviate-ts-client';
import { input } from '@inquirer/prompts';
import { BufferMemory } from 'langchain/memory';
import { Injectable, Logger } from '@nestjs/common';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { DocumentFileType } from '../../libs/@types/enums';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { DocxLoader } from 'langchain/document_loaders/fs/docx';
import { WeaviateStore } from 'langchain/vectorstores/weaviate';
import { REPHRASE_TEMPLATE } from '../../libs/@types/constants';
import { ConversationalRetrievalQAChain } from 'langchain/chains';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { LLMonitorHandler } from 'langchain/callbacks/handlers/llmonitor';

@Injectable()
export class LangChainService {
  private chatModel: ChatOpenAI;
  private splitter: RecursiveCharacterTextSplitter;
  private logger = new Logger(LangChainService.name);
  private storeConfig = {
    client: weaviate.client({
      scheme: process.env.WEAVIATE_SCHEME,
      host: process.env.WEAVIATE_HOST,
      apiKey: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY || undefined),
    }),
    textKey: 'text',
    indexName: process.env.WEAVIATE_INDEX_NAME,
    metadataKeys: ['law', 'administrative', 'jurisprudence', 'government'],
  };

  constructor() {
    this.splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 0,
    });
    this.chatModel = new ChatOpenAI({
      callbacks: [new LLMonitorHandler()],
      modelName: process.env.OPENAI_MODEL,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
  }

  private async getChain(): Promise<ConversationalRetrievalQAChain> {
    return ConversationalRetrievalQAChain.fromLLM(
      this.chatModel,
      (
        await WeaviateStore.fromExistingIndex(new OpenAIEmbeddings(), {
          ...this.storeConfig,
        })
      ).asRetriever({ k: 10 }),
      {
        returnSourceDocuments: true,
        questionGeneratorChainOptions: {
          template: REPHRASE_TEMPLATE,
          llm: this.chatModel,
        },
        memory: new BufferMemory({
          memoryKey: 'chat_history',
          inputKey: 'question',
          outputKey: 'text',
        }),
      }
    );
  }

  documentProcessing(documentType: string | number): Subscription {
    const source = {
      [DocumentFileType.PDF]: {
        path: 'apps/api/src/assets/pdfs',
        loader: PDFLoader,
      },
      [DocumentFileType.DOC]: {
        path: 'apps/api/src/assets/docs',
        loader: DocxLoader,
      },
    }[documentType];

    if (!source) {
      this.logger.error(`Invalid document type: ${documentType}`);
      return;
    }

    return from(fs.readdirSync(source.path, 'utf-8'))
      .pipe(
        concatMap((document) => {
          return from(
            new source.loader(`${source.path}/${document}`).load()
          ).pipe(
            concatMap((loadedDocument) => {
              return from(
                this.splitter.createDocuments(
                  loadedDocument.flat().map((doc) => doc.pageContent)
                )
              ).pipe(
                concatMap((splittedDocument) => {
                  return from(
                    WeaviateStore.fromDocuments(
                      splittedDocument,
                      new OpenAIEmbeddings(),
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

  createChainCompletion(userContent: string): Observable<string> {
    return from(input({ message: 'Hỏi:' })).pipe(
      takeWhile(
        (question) =>
          ![
            'exit',
            'quit',
            'stop',
            'huỷ',
            'dừng',
            'thoát',
            'cút',
            'bye',
            'biến',
            'tạm biệt',
          ].includes(question)
      ),
      concatMap((question) =>
        from(this.getChain()).pipe(
          concatMap((chain) => chain.call({ question, userContent }))
        )
      ),
      map((chain) => {
        const sources = [
          ...new Set(
            chain.sourceDocuments.map(
              (doc: { metadata: { source: unknown } }) => doc.metadata.source
            )
          ),
        ];
        return `Câu trả lời: ${chain.answer}\n\nNguồn: ${sources.join(', ')}`;
      })
    );
  }
}
