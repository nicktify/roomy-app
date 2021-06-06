/// <reference types="multer" />
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { ReturnPostDto } from './dto/return-post-dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getAllRoomPosts({ id }: {
        id: any;
    }): Promise<ReturnPostDto[] | {
        msg: string;
    }>;
    getPost({ id }: {
        id: any;
    }): Promise<ReturnPostDto | {
        msg: string;
    }>;
    addNewPost(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<ReturnPostDto | {
        msg: string;
    }>;
    deletePost({ postId, roomId }: DeletePostDto): Promise<{
        msg: string;
    }>;
}
