import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
 } from '@nestjs/websockets';
 import { Logger } from '@nestjs/common';
 import { Server } from 'ws';
 
 @WebSocketGateway()
 export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('NotificationsGateway');
 
  @SubscribeMessage('msgToServer')
  handleMessage(client, payload: string): void {
    console.log(payload)
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
    this.server.emit('hello', 'world')
  }
 }