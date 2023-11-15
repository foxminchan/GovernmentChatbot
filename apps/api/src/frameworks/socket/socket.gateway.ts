import {
  MessageBody,
  OnGatewayInit,
  WebSocketServer,
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { OpenaiService } from '../openai';
import { ChatBody } from '../../libs/helpers';
import { Namespace, Socket } from 'socket.io';
import { LangChainService } from '../langchain';
import { UsePipes, Logger } from '@nestjs/common';
import { ChatHistoryService } from '../../modules';
import { WsValidationPipe } from '../../libs/pipes';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'chat',
  transports: ['websocket'],
})
@UsePipes(WsValidationPipe)
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SocketGateway.name);

  constructor(
    private readonly openaiService: OpenaiService,
    private readonly langChainService: LangChainService,
    private readonly chatHistoryService: ChatHistoryService
  ) {}

  handleDisconnect(client: Socket): void {
    this.logger.debug(`Client disconnected: ${client.id}`);
    client.disconnect();
  }

  handleConnection(client: Socket): void {
    this.logger.debug(`Client connected: ${client.id}`);
  }

  afterInit(server: Socket): void {
    this.logger.log(`💬 Websocket Gateway initialized ${server.id} `);
  }

  @WebSocketServer()
  server: Namespace;

  @SubscribeMessage('withOpenAI')
  handleEvent(@MessageBody() data: string): void {
    setTimeout(() => {
      this.server.emit(
        'response',
        this.openaiService.createChatCompletion(data)
      );
    }, 1000);
  }

  @SubscribeMessage('withLangChain')
  handleChain(@MessageBody() chatBody: ChatBody): void {
    this.openaiService
      .createChatCompletion(chatBody.message)
      .subscribe((response: string) => {
        setTimeout(() => {
          this.server.emit('receive', response);
        }, 1000);

        this.chatHistoryService.addChatHistory({
          question: chatBody.message,
          answer: response,
          date: new Date(),
          user_id: chatBody.user_id,
          topic_id: chatBody.topic_id,
        });
      });
  }
}
