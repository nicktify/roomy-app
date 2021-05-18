import { Document } from 'mongoose';
export declare type ForumPostCommentDocument = ForumPostComment & Document;
export declare class ForumPostComment {
    forumPostId: string;
    authorId: string;
    authorProfilePicture: string;
    authorName: string;
    body: string;
    date: Date;
}
export declare const ForumPostCommentSchema: import("mongoose").Schema<Document<ForumPostComment, {}>, import("mongoose").Model<any, any>, undefined>;
