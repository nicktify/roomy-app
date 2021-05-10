/// <reference types="multer" />
import { CreatePostDto } from './dto/create-post.dto';
import { ReturnPostDto } from './dto/return-post-dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    getPost({ id }: {
        id: any;
    }): Promise<ReturnPostDto>;
    addNewPost(createPostDto: CreatePostDto, file: Express.Multer.File): Promise<ReturnPostDto>;
}
