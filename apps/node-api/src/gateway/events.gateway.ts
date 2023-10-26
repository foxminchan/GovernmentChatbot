import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OpenaiService } from '../frameworks';
import { ChatHistoryService } from '../usecase';
import { Body } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(
    private readonly openaiService: OpenaiService,
    private readonly chatHistoryService: ChatHistoryService
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async handleEvent(
    @MessageBody() data: string,
    @Body('user_id') user_id: string,
    @Body('topic_id') topic_id: string
  ) {
    const response = await this.openaiService.createChatCompletion(data);
    setTimeout(() => {
      this.server.emit('events', response);
    }, 1000);

    const chatData = {
      message: data,
      date: new Date(),
      user_id: user_id,
      topic_id: topic_id,
    };

    this.chatHistoryService.addChatHistory(chatData);
    this.chatHistoryService.addChatHistory({ ...chatData, message: response });
  }
}
