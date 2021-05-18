import { Document } from 'mongoose';
export declare type ForumPostDocument = ForumPost & Document;
export declare class ForumPost {
    roomId: string;
    authorId: string;
    authorProfilePicture: string;
    authorName: string;
    body: string;
    image: string;
    date: Date;
    comments: string[];
}
export declare const ForumPostSchema: import("mongoose").Schema<Document<ForumPost, {}>, import("mongoose").Model<any, any>, undefined>;
