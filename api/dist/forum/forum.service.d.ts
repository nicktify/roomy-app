/// <reference types="multer" />
import { Model } from "mongoose";
import { RoomDocument } from "src/rooms/schemas/room.schema";
import { UserDocument } from "src/users/schemas/user.schema";
import { CreateForumPostDto } from "./dto/create-forum-post.dto";
import { ReturnForumPostDto } from "./dto/return-forum-post.dto";
import { ForumPostCommentDocument } from "./schemas/forum-post-comment.schema";
import { ForumPostDocument } from "./schemas/forum-post.schema";
export declare class ForumService {
    private userModel;
    private roomModel;
    private forumPostModel;
    private forumPostCommentModel;
    constructor(userModel: Model<UserDocument>, roomModel: Model<RoomDocument>, forumPostModel: Model<ForumPostDocument>, forumPostCommentModel: Model<ForumPostCommentDocument>);
    createNewForumPost({ authorId, roomId, body }: CreateForumPostDto, file: Express.Multer.File): Promise<ReturnForumPostDto | {
        msg: string;
    }>;
}
