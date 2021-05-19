/// <reference types="multer" />
import { Model } from 'mongoose';
import { RoomDocument } from 'src/rooms/schemas/room.schema';
import { PostDocument } from './schemas/post.schema';
import { ReturnPostDto } from './dto/return-post-dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UserDocument } from 'src/users/schemas/user.schema';
export declare class PostsService {
    private postModel;
    private roomModel;
    private userModel;
    constructor(postModel: Model<PostDocument>, roomModel: Model<RoomDocument>, userModel: Model<UserDocument>);
    getAllRoomPost(id: string): Promise<ReturnPostDto[] | {
        msg: string;
    }>;
    getPost(id: string): Promise<ReturnPostDto | {
        msg: string;
    }>;
    addNewPost({ authorId, authorProfilePicture, authorName, roomId, body }: CreatePostDto, file: Express.Multer.File): Promise<ReturnPostDto | {
        msg: string;
    }>;
    deletePost(postId: any, roomId: any): Promise<{
        msg: string;
    }>;
}
