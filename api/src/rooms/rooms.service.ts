import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from './schemas/room.schema';

@Injectable()
export class RoomsService {

  constructor(@InjectModel('Room') private roomModel: Model<RoomDocument>) {}

  async getRooms(): Promise<Room[]> {
    return await this.roomModel.find();
  }

  async createRoom(room: Room): Promise<Room> {
    return this.roomModel.create(room);
  }
}
