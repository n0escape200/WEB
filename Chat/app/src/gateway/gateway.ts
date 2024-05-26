import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  sendMessage(message: any) {
    this.server.emit('whatsappMessage', message);
  }
}
