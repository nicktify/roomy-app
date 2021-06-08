import { Server } from 'socket.io';
export declare class NotificationsGateway {
    server: Server;
    handleMessage(data: string): string;
}
