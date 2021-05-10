import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema } from 'src/rooms/schemas/room.schema';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostSchema } from './schemas/post.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Room', schema: RoomSchema },
    ])
  ],
  controllers: [ PostsController ],
  providers: [ PostsService ]
})
export class PostsModule {}
