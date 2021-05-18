import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateForumPostDto } from './dto/create-forum-post.dto';
import { DeleteForumPostDto } from './dto/delete-forum-post.dto';
import { GetAllRoomForumPostDto } from './dto/get-all-room-forum-posts.dto';
import { ReturnForumPostDto } from './dto/return-forum-post.dto';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor( private forumService: ForumService) {}

  @UseGuards( JwtAuthGuard )
  @Post('create-new-forum-post')
  @UseInterceptors(FileInterceptor('file'))
  async createNewForumPost(@Body() createForumPostDto: CreateForumPostDto, @UploadedFile() file: Express.Multer.File): Promise<ReturnForumPostDto | {msg: string}> {
    return this.forumService.createNewForumPost( createForumPostDto, file );
  }

  @UseGuards( JwtAuthGuard )
  @Get('get-all-room-forum-posts/:roomId')
  async getAllRoomForumPosts( @Param() roomId: GetAllRoomForumPostDto): Promise<ReturnForumPostDto[] | {msg: string}> {
    return this.forumService.getAllRoomForumPost( roomId );
  }

  @UseGuards( JwtAuthGuard )
  @Delete('delete-forum-post/:forumPostId')
  async deleteForumPost(@Param() forumPostId: DeleteForumPostDto): Promise<{msg: string}> {
    return this.forumService.deleteForumPost( forumPostId );
  }
}
