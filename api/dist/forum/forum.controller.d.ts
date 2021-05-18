/// <reference types="multer" />
import { CreateForumPostDto } from './dto/create-forum-post.dto';
import { ReturnForumPostDto } from './dto/return-forum-post.dto';
import { ForumService } from './forum.service';
export declare class ForumController {
    private forumService;
    constructor(forumService: ForumService);
    createNewForumPost(createForumPostDto: CreateForumPostDto, file: Express.Multer.File): Promise<ReturnForumPostDto | {
        msg: string;
    }>;
}
