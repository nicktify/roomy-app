import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from 'src/posts/schemas/post.schema';
import { UserSchema } from 'src/users/schemas/user.schema';

import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomSchema } from './schemas/room.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature([
      { name: 'Room', schema: RoomSchema }, 
      { name: 'User', schema: UserSchema },
      { name: 'Post', schema: PostSchema },
    ]),
  ],
  controllers: [ RoomsController ],
  providers: [ RoomsService ]
})
export class RoomsModule {};
