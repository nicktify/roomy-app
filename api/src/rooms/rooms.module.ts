import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {UserSchema} from 'src/users/schemas/user.schema';

import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { RoomSchema } from './schemas/room.schema';

@Module({
  imports: [ 
    MongooseModule.forFeature([
      { name: 'Room', schema: RoomSchema }, 
      { name: 'User', schema: UserSchema }
    ]),
  ],
  controllers: [ RoomsController ],
  providers: [ RoomsService ]
})
export class RoomsModule {};
