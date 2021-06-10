import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server } from 'ws';
export declare class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private logger;
    handleMessage(client: any, payload: string): void;
    afterInit(server: Server): void;
    handleDisconnect(client: any): void;
    handleConnection(client: any, ...args: any[]): void;
}
