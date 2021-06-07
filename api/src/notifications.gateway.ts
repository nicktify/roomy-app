import { Logger } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect  {
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: any): string {
    console.log(data)
    return 'Hello world!';
  }

  afterInit(server: Server) {
    this.logger.log('Init');
   }
  
   handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
   }
  
   handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
   }
}
