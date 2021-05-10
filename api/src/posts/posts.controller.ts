import { Body, Controller, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { ReturnPostDto } from './dto/return-post-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

  constructor( private readonly postsService: PostsService ) {}

  @UseGuards( JwtAuthGuard )
  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  addNewPost( @Body() createPostDto: CreatePostDto, @UploadedFile() file: Express.Multer.File): Promise<ReturnPostDto | { msg: string }> {
    return this.postsService.addNewPost(createPostDto, file);
  }

}
