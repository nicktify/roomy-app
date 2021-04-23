import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoomDocument } from './schemas/room.schema';
import { UserDocument } from 'src/users/schemas/user.schema';
import { EditRoomDto } from './dto/edit-room-dto';
import { ReturnRoomDto } from './dto/return-room-dto';
import { CreateRoomDto } from './dto/create-room-dto';

@Injectable()
export class RoomsService {

  constructor(@InjectModel('Room') private roomModel: Model<RoomDocument>, @InjectModel('User') private userModel: Model<UserDocument>) {}

  async getRooms(): Promise<ReturnRoomDto[]> {

    const rooms = await this.roomModel.find();

    const curatedRooms = rooms.map(room => {
      return {
        name: room.name,
        owners: room.owners,
        participants: room.participants,
      }
    })

    return curatedRooms;

  }

  async createRoom( room: CreateRoomDto ): Promise<ReturnRoomDto> {

    try {

      const createdRoom = await this.roomModel.create(room);
      
      const curatedRoom = {
        name: createdRoom.name,
        owners: createdRoom.owners,
        participants: createdRoom.participants,
      }
  
      return curatedRoom;
      
    } catch (error) {
      console.log(error);
      throw 'Something went wrong, please try again.';
    }

  }

  async editRoom( room: EditRoomDto ): Promise<ReturnRoomDto> {

    try {
      
      await this.roomModel.updateOne({ _id: room.id, name: room.name, owners: room.owners, participants: room.participants });
      const editedRoom = await this.roomModel.findById(room.id);

      console.log(editedRoom);

      const curatedRoom = {
        name: editedRoom.name,
        owners: editedRoom.owners,
        participants: editedRoom.participants,
      }

      return curatedRoom;

    } catch (error) {

      console.log(error)
      throw 'Something went wrong, please try again.'

    }

  }
}
