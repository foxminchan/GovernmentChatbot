import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OpenaiService } from '../openai';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(private readonly openaiService: OpenaiService) {}

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
  async handleChain(@MessageBody() data: string) {
    throw new Error(`Not implemented ${data}`);
  }
}
