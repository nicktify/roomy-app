/// <reference types="multer" />
import { CreatePostDto } from './dto/create-post.dto';
import { ReturnPostDto } from './dto/return-post-dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    addNewPost(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<ReturnPostDto | {
        msg: string;
    }>;
}
