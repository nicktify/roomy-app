import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoomDocument } from './schemas/room.schema';
import { Room } from './interfaces/room-interface';
import { UserDocument } from 'src/users/schemas/user.schema';
import { EditRoomDto } from './dto/edit-room-dto';
import { ReturnRoomDto } from './dto/return-room-dto';
import { CreateRoomDto } from './dto/create-room-dto';

@Injectable()
export class RoomsService {

  constructor(@InjectModel('Room') private roomModel: Model<RoomDocument>, @InjectModel('User') private userModel: Model<UserDocument>) {}

  async getRooms(): Promise<Room[]> {
    return await this.roomModel.find();
  }

  async createRoom( room: CreateRoomDto, userId: string ): Promise<Room> {
    

  }

  async editRoom( room: EditRoomDto ): Promise<ReturnRoomDto | { msg: string }> {

    try {

      const user = await this.userModel.findById(room.userId);
      

      console.log(user)

      // return {
      //   name: editedRoom.name,
      //   password: editedRoom.password,
      //   participants: editedRoom.participants,
      // }

      return { msg: 'Hola' }

    } catch (error) {

      console.log(error)
      throw 'Something went wrong'

    }

  }
}
