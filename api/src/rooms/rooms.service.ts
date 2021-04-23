import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RoomDocument } from './schemas/room.schema';
import { UserDocument } from 'src/users/schemas/user.schema';
import { EditRoomDto } from './dto/edit-room-dto';
import { ReturnRoomDto } from './dto/return-room-dto';
import { CreateRoomDto } from './dto/create-room-dto';
import { AddNewOwnerDto } from './dto/add-new-owner-dto';
import { DeleteOwnerDto } from './dto/delete-owner-dto';

@Injectable()
export class RoomsService {

  constructor( @InjectModel('Room') private roomModel: Model<RoomDocument>, @InjectModel('User') private userModel: Model<UserDocument> ) {}

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

    try {

      const findedRoom = await this.roomModel.findById( id );
      if ( ! findedRoom ) return { msg: 'Room not exist.'};

      return {
        id: findedRoom._id,
        name: findedRoom.name,
        owners: findedRoom.owners,
        participants: findedRoom.participants,
      }
      
    } catch ( error ) {
      throw error;
    }
  }

  async createRoom( room: CreateRoomDto ): Promise<ReturnRoomDto | { msg: string }> {

    try {

      const findOwner = await this.userModel.findById( room.owner );

      if ( ! findOwner ) return { msg: 'User not exist.' };

      const newRoom = {
        name: room.name,
        password: room.password,
        owners: room.owner,
      }

      const createdRoom = await this.roomModel.create( newRoom );
      
      const curatedRoom = {
        id: createdRoom._id,
        name: createdRoom.name,
        owners: createdRoom.owners,
        participants: createdRoom.participants,
      }
  
      return curatedRoom;
      
    } catch ( error ) {
      throw error;
    }

  }

  async editRoom( room: EditRoomDto ): Promise<ReturnRoomDto> {

    try {
      
      await this.roomModel.updateOne( room );
      
      const editedRoom = await this.roomModel.findById(room.id);

      console.log( editedRoom );

      const curatedRoom = {
        id: editedRoom._id,
        name: editedRoom.name,
        owners: editedRoom.owners,
        participants: editedRoom.participants,
      }

      return curatedRoom;

    } catch ( error ) {
      throw error;
    }

  }

  async deleteRoom( id: string ): Promise<{ msg: string }> {

    try {

      await this.roomModel.deleteOne({ _id: id });
      return { msg: 'Room has been deleted.' };

    } catch ( error ) {
      throw error;
    }

  }

  async addNewOwner( { id, owner, newOwner }: AddNewOwnerDto ): Promise<ReturnRoomDto | { msg: string }> {

    if ( ! id ) return { msg: 'Id is missing.' }
    if ( ! owner ) return { msg: 'Owner is missing.' }
    if ( ! newOwner ) return { msg: 'New Owner is missing.' }

    try {

      const findedRoom = await this.roomModel.findById( id );
      if ( ! findedRoom ) return { msg: 'The room not exists.' };
  
      const findNewUser = await this.userModel.findById( newOwner );
      if ( ! findNewUser ) return { msg: 'New user not exists.' };
  
      const findOwner = await this.userModel.findById( owner );
      if ( ! findOwner ) return { msg: 'Owner user not exist' };
  
      if( ! findedRoom.owners.includes( owner ) ) return { msg: 'You are not the owner of this room.' }

      if ( findedRoom.owners.includes( newOwner ) ) return { msg: 'Given user is already an owner of this room.' };
  
      findedRoom.owners.push( newOwner );
      findedRoom.save();
  
      const curatedRoom = {
        id: findedRoom._id,
        name: findedRoom.name,
        owners: findedRoom.owners,
        participants: findedRoom.participants
      }
  
      return curatedRoom;
      
    } catch (error) {
      throw error
    }

  }

  async deleteOwner( { id, owner, ownerToDelete }: DeleteOwnerDto ): Promise<ReturnRoomDto | { msg: string }> {

    if ( ! id ) return { msg: 'Id is missing.' };
    if ( ! owner ) return { msg: 'Owner is missing.' };
    if ( ! ownerToDelete ) return { msg: 'Owner to delete is missing.' };

    try {

      const findedRoom = await this.roomModel.findById(id);
      if ( ! findedRoom ) return { msg: 'Room not exist.' };

      if ( ! findedRoom.owners.includes( owner ) ) return { msg: 'You are not the owner of this room.' };
      
      const filteredOwners = findedRoom.owners.filter( owner => owner !== ownerToDelete );

      if ( filteredOwners.length === findedRoom.owners.length ) return { msg: 'Given user is not an owner of this room.' };

      findedRoom.owners = filteredOwners;
      findedRoom.save();

      const curatedRoom: ReturnRoomDto = {
        id: findedRoom._id,
        name: findedRoom.name,
        owners: findedRoom.owners,
        participants: findedRoom.participants,
      }

      return curatedRoom;
      
    } catch ( error ) {
      throw error;
    }
  }
}
