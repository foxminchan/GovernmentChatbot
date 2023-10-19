import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OpenaiService } from '../frameworks';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly openaiService: OpenaiService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  async handleEvent(@MessageBody() data: string) {
    const response = await this.openaiService.createChatCompletion(data);
    setTimeout(() => {
      this.server.emit('events', response);
    }, 1000);
  }
}
