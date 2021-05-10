/// <reference types="multer" />
import { Model } from 'mongoose';
import { RoomDocument } from 'src/rooms/schemas/room.schema';
import { PostDocument } from './schemas/post.schema';
import { ReturnPostDto } from './dto/return-post-dto';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private postModel;
    private roomModel;
    constructor(postModel: Model<PostDocument>, roomModel: Model<RoomDocument>);
    getPost(id: string): Promise<ReturnPostDto>;
    addNewPost({ authorId, authorProfilePicture, authorName, roomId, body }: CreatePostDto, file: Express.Multer.File): Promise<ReturnPostDto>;
}
