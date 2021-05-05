import { Document } from 'mongoose';
export declare type RoomDocument = Room & Document;
export declare class Room {
    name: string;
    password: string;
    owners: string[];
    participants: string[];
    links: [
        {
            name: string;
            link: string;
        }
    ];
    dates: [
        {
            date: Date;
            name: string;
            description: string;
        }
    ];
    posts: [
        {
            authorId: string;
            body: string;
            date: Date;
        }
    ];
    books: [
        {
            name: string;
            description: string;
            link: string;
        }
    ];
}
export declare const RoomSchema: import("mongoose").Schema<Document<Room, {}>, import("mongoose").Model<any, any>, undefined>;