import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RoomDocument } from "src/rooms/schemas/room.schema";
import { UserDocument } from "src/users/schemas/user.schema";
import { ForumPostCommentDocument } from "./schemas/forum-post-comment.schema";

@Injectable()
export class ForumService {
  constructor( @InjectModel('User') private userModel: Model<UserDocument>,
    @InjectModel('Room') private roomModel: Model<RoomDocument>,
    @InjectModel('ForumPostComment') private forumPostCommentModel: Model<ForumPostCommentDocument>
    ) {}

  

}
