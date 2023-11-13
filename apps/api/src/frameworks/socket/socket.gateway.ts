import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { UsePipes, Logger } from '@nestjs/common';
import { OpenaiService } from '../openai';
import { ChatBody } from '../../libs/helpers';
import { Namespace, Socket } from 'socket.io';
import { LangChainService } from '../langchain';
import { ChatHistoryService } from '../../modules';
import { WsValidationPipe } from '../../libs/pipes';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*',
  },
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

  handleDisconnect(client: Socket) {
    this.logger.debug(`Client disconnected: ${client.id}`);
    client.disconnect();
  }

  handleConnection(client: Socket) {
    this.logger.debug(`Client connected: ${client.id}`);
  }

  afterInit(server: Socket) {
    this.logger.log(`💬 Websocket Gateway initialized ${server.id} `);
  }

  @WebSocketServer()
  server: Namespace;

  @SubscribeMessage('withOpenAI')
  async handleEvent(@MessageBody() data: string) {
    setTimeout(() => {
      this.server.emit(
        'response',
        this.openaiService.createChatCompletion(data)
      );
    }, 1000);
  }

  @SubscribeMessage('withLangChain')
  async handleChain(@MessageBody() chatBody: ChatBody) {
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
