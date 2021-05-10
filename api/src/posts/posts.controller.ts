import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { DeletePostDto } from './dto/delete-post.dto';
import { ReturnPostDto } from './dto/return-post-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

  constructor( private readonly postsService: PostsService ) {}

  @UseGuards( JwtAuthGuard )
  @Get('get-all-posts/:id')
  getAllRoomPosts( @Param() { id } ): Promise<ReturnPostDto[] | { msg: string }> {
    return this.postsService.getAllRoomPost( id )
  }


  @UseGuards( JwtAuthGuard )
  @Get('get-post/:id')
  getPost( @Param() { id } ): Promise<ReturnPostDto | { msg: string }> {
    return this.postsService.getPost( id )
  }

  @UseGuards( JwtAuthGuard )
  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  addNewPost( @Body() createPostDto: CreatePostDto, @UploadedFile() file: Express.Multer.File): Promise<ReturnPostDto> {
    return this.postsService.addNewPost( createPostDto, file );
  }

  @UseGuards( JwtAuthGuard )
  @Delete('delete-post/')
  deletePost( @Body() { postId, roomId }: DeletePostDto ): Promise<{ msg: string }> {
    return this.postsService.deletePost( postId, roomId );
  }

}
