/// <reference types="multer" />
import { Model } from "mongoose";
import { RoomDocument } from "src/rooms/schemas/room.schema";
import { UserDocument } from "src/users/schemas/user.schema";
import { CreateForumPostDto } from "./dto/create-forum-post.dto";
import { DeleteForumPostDto } from "./dto/delete-forum-post.dto";
import { GetAllForumPostCommentsDto } from "./dto/get-all-forum-post-comments.dto";
import { GetAllRoomForumPostDto } from "./dto/get-all-room-forum-posts.dto";
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
    getAllRoomForumPost({ roomId }: GetAllRoomForumPostDto): Promise<ReturnForumPostDto[] | {
        msg: string;
    }>;
    getAllForumPostComments({ forumPostId }: GetAllForumPostCommentsDto): Promise<{
        msg: string;
    }>;
    deleteForumPost({ forumPostId }: DeleteForumPostDto): Promise<{
        msg: string;
    }>;
}
