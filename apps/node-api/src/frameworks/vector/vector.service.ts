import { ulid } from 'ulid';
import { Injectable } from '@nestjs/common';
import { ChromaClient, Collection, OpenAIEmbeddingFunction } from 'chromadb';

@Injectable()
export class VectorService {
  private embedder: OpenAIEmbeddingFunction;
  private client: ChromaClient;

  constructor() {
    this.embedder = new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY,
    });
    this.client = new ChromaClient();
  }

  async generateEmbeddings(documents: string[]): Promise<number[][]> {
    return this.embedder.generate(documents);
  }

  /**
   * Gets or creates a collection with the given name and embedding function.
   * @param name The name of the collection to get or create (note: name wile be vietnamese-gov-laws)
   * @returns A Promise that resolves to the Collection object.
   */
  async getOrCreateCollection(name: string): Promise<Collection> {
    const collection = await this.client.getOrCreateCollection({
      name: name,
      embeddingFunction: this.embedder,
    });
    return collection;
  }

  async addDocuments(
    collectionName: string,
    documents: string[],
    metadata?: Record<string, string | number | boolean>
  ): Promise<void> {
    const collection = await this.client.getCollection({
      name: collectionName,
    });

    if (!collection)
      throw new Error(`Collection ${collectionName} does not exist`);

    await collection.add({
      ids: ulid(),
      documents: documents,
      metadatas: metadata,
    });
  }
}
