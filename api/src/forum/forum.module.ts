import { Module } from '@nestjs/common';
import { ForumService } from './forum.service';
import { ForumController } from './forum.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from 'src/rooms/schemas/room.schema';
import { UserSchema } from 'src/users/schemas/user.schema';
import { ForumPostCommentSchema } from './schemas/forum-post-comment.schema';
import { ForumPostSchema } from './schemas/forum-post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Room', schema: RoomSchema }, 
      { name: 'User', schema: UserSchema },
      { name: 'ForumPost', schema: ForumPostSchema },
      { name: 'ForumPostComment', schema: ForumPostCommentSchema },
    ]),
  ],
  providers: [ForumService],
  controllers: [ForumController]
})
export class ForumModule {}
