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
        id: room._id,
        name: room.name,
        owners: room.owners,
        participants: room.participants,
      }
    })

    return curatedRooms;

  }

  async getRoom( id: string ): Promise<ReturnRoomDto | { msg: string }> {
    const findedRoom = await this.roomModel.findById(id);
    if (!findedRoom) return { msg: 'Room not exist.'}
    return {
      id: findedRoom._id,
      name: findedRoom.name,
      owners: findedRoom.owners,
      participants: findedRoom.participants,
    }
  }

  async createRoom( room: CreateRoomDto ): Promise<ReturnRoomDto | { msg: string }> {

    try {

      const findOwner = await this.userModel.findById(room.owner);

      /* if user not exist just return */
      if (!findOwner) return { msg: 'User not exist.' };

      /* Change propertie owner for owners[] */
      const newRoom = {
        name: room.name,
        password: room.password,
        owners: room.owner,
      }

      const createdRoom = await this.roomModel.create(newRoom);
      
      const curatedRoom = {
        id: createdRoom._id,
        name: createdRoom.name,
        owners: createdRoom.owners,
        participants: createdRoom.participants,
      }
  
      return curatedRoom;
      
    } catch (error) {
      console.log(error);
    }

  }

  async editRoom( room: EditRoomDto ): Promise<ReturnRoomDto> {

    try {
      
      await this.roomModel.updateOne(room);
      
      const editedRoom = await this.roomModel.findById(room.id);

      console.log(editedRoom);

      const curatedRoom = {
        id: editedRoom._id,
        name: editedRoom.name,
        owners: editedRoom.owners,
        participants: editedRoom.participants,
      }

      return curatedRoom;

    } catch (error) {

      console.log(error)

    }

  }

  async deleteRoom( id: string ): Promise<{ msg: string }> {

    try {

      await this.roomModel.deleteOne({ _id: id });
      return { msg: 'Room has been deleted.' };

    } catch (error) {
      console.log(error);
    }

  }
}
