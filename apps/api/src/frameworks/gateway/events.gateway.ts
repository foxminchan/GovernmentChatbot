import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OpenaiService } from '../openai';
import { ChatType } from '../../libs/enums';
import { ChatBody } from '../../libs/helpers';
import { LangChainService } from '../langchain';
import { ChatHistoryService } from '../../modules';
import { WsValidationPipe } from '../../libs/pipes';
import { WsThrottlerGuard } from '../../libs/guards';
import { UseGuards, UsePipes } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UsePipes(WsValidationPipe)
@UseGuards(WsThrottlerGuard)
export class EventsGateway {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly langChainService: LangChainService,
    private readonly chatHistoryService: ChatHistoryService
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('gpt')
  async handleEvent(@MessageBody() data: string) {
    const response = await this.openaiService.createChatCompletion(data);
    setTimeout(() => {
      this.server.emit('gpt', response);
    }, 1000);
  }

  @SubscribeMessage('chain')
  async handleChain(@MessageBody() chatBody: ChatBody) {
    const response = await this.openaiService.createChatCompletion(
      chatBody.message
    );

    setTimeout(() => {
      this.server.emit('chain', response);
    }, 1000);

    const chatData = {
      message: chatBody.message,
      date: new Date(),
      user_id: chatBody.user_id,
      topic_id: chatBody.topic_id,
    };

    this.chatHistoryService.addChatHistory({
      ...chatData,
      chat_type: ChatType.HUMAN,
    });

    this.chatHistoryService.addChatHistory({
      ...chatData,
      message: response,
      chat_type: ChatType.BOT,
    });
  }
}
