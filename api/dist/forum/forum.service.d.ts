import { Model } from "mongoose";
import { RoomDocument } from "src/rooms/schemas/room.schema";
import { UserDocument } from "src/users/schemas/user.schema";
import { ForumPostCommentDocument } from "./schemas/forum-post-comment.schema";
export declare class ForumService {
    private userModel;
    private roomModel;
    private forumPostCommentModel;
    constructor(userModel: Model<UserDocument>, roomModel: Model<RoomDocument>, forumPostCommentModel: Model<ForumPostCommentDocument>);
}
