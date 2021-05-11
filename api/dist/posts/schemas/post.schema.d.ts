import { Document } from 'mongoose';
export declare type PostDocument = Post & Document;
export declare class Post {
    roomId: string;
    authorId: string;
    authorProfilePicture: string;
    authorName: string;
    body: string;
    date: Date;
    image: {
        url: string;
        size: {
            width: number;
            height: number;
        };
    };
}
export declare const PostSchema: import("mongoose").Schema<Document<Post, {}>, import("mongoose").Model<any, any>, undefined>;
