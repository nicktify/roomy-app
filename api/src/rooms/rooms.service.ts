import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoomDocument } from './schemas/room.schema';
import { Room } from './interfaces/room-interface';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class RoomsService {

  constructor(@InjectModel('Room') private roomModel: Model<RoomDocument>, @InjectModel('User') private userModel: Model<UserDocument>) {}

  async getRooms(): Promise<Room[]> {
    return await this.roomModel.find()
  }

  async createRoom( room: Room, userId: string ): Promise<Room> {
    
    const createdRoom = await this.roomModel.create(room);
    
    const user = await this.userModel.findById(userId);
    user.rooms.push(createdRoom);
    user.save();

    return createdRoom;

  }
}
