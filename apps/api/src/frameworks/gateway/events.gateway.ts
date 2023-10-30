import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OpenaiService } from '../openai';
import { LangChainService } from '../langchain';
import { ChatHistoryService } from '../../modules';
import { ChatType } from '../../libs/enums';
import { Body } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
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

  // @SubscribeMessage('chain')
  // async handleChain(
  //   @MessageBody() data: string,
  //   @Body() user_id: string,
  //   @Body() topic_id: string
  // ) {
  //   const response = await this.langChainService.selfQueryRetriever(data);
  //   setTimeout(() => {
  //     this.server.emit('chain', response);
  //   }, 1000);

  //   const chatData = {
  //     message: data,
  //     date: new Date(),
  //     user_id: user_id,
  //     topic_id: topic_id,
  //   };

  //   this.chatHistoryService.addChatHistory({
  //     ...chatData,
  //     chat_type: ChatType.HUMAN,
  //   });

  //   this.chatHistoryService.addChatHistory({
  //     ...chatData,
  //     message: response.message,
  //     chat_type: ChatType.BOT,
  //   });
  // }
}
