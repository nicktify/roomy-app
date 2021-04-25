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
import { addNewParticipantDto } from './dto/add-new-participant-dto';
import { DeleteParticipantDto } from './dto/delete-participant-dto';
import { AddNewPostDto } from './dto/add-new-post-dto';
import { AddNewBookDto } from './dto/add-new-book-dto';
import { AddNewLinkDto } from './dto/add-new-link-dto';

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

  async createRoom( { name, password, owner }: CreateRoomDto ): Promise<ReturnRoomDto | { msg: string }> {

    try {

      const findOwner = await this.userModel.findById( owner );

      if ( ! findOwner ) return { msg: 'User not exist.' };

      const createdRoom = await this.roomModel.create({ name, password, owners: owner });
      
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

      const roomToDelete = await this.roomModel.findById( id );

      for (let i = 0; i < roomToDelete.owners.length; i ++) {
        const owner = await this.userModel.findById( roomToDelete.owners[i] );
        if ( owner ) {
          owner.ownedRooms = owner.ownedRooms.filter(room => room != id);
          owner.save();
        }
      }
      
      for (let i = 0; i < roomToDelete.participants.length; i ++) {
        const participant = await this.userModel.findById( roomToDelete.participants[i] );
        if ( participant ) {
          participant.participantRooms = participant.participantRooms.filter(room => room !== id);
          participant.save();
        }
      }

      await this.roomModel.deleteOne({ _id: id });
      return { msg: 'Room has been deleted.' };

    } catch ( error ) {
      throw error;
    }

  }

  async addNewOwner( { id, owner, newOwner }: AddNewOwnerDto ): Promise<ReturnRoomDto | { msg: string }> {

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

      /**
       * Check if the room id is in the owned rooms of the new owner added. Just to be sure, so we don't add two id of the same room.
       */
      if ( ! findNewUser.ownedRooms.includes( id ) ) { 
        findNewUser.ownedRooms.push(id);
        findNewUser.save();
      }
  
      const curatedRoom = {
        id: findedRoom._id,
        name: findedRoom.name,
        owners: findedRoom.owners,
        participants: findedRoom.participants,
      }
  
      return curatedRoom;
      
    } catch (error) {
      throw error;
    }

  }

  async deleteOwner( { id, owner, ownerToDelete }: DeleteOwnerDto ): Promise<ReturnRoomDto | { msg: string }> {

    try {

      const findedRoom = await this.roomModel.findById( id );
      if ( ! findedRoom ) return { msg: 'Room not exist.' };

      const findOwner = await this.userModel.findById( owner );
      if( ! findOwner ) return { msg: 'Owner not exist.' };

      const findOwnerToDelete = await this.userModel.findById( ownerToDelete );
      if ( ! findOwnerToDelete ) return { msg: 'Owner to delete not exist' };

      if ( ! findedRoom.owners.includes( owner ) ) return { msg: 'You are not the owner of this room.' };
      
      if ( ! findedRoom.owners.includes( ownerToDelete ) ) return { msg: 'Given user is not an owner of this room.' };
      const filteredOwners = findedRoom.owners.filter( owner => owner !== ownerToDelete );
      findedRoom.owners = filteredOwners;
      findedRoom.save();

      if ( findOwnerToDelete.ownedRooms.includes( id ) ) {
        const filteredRooms = findOwnerToDelete.ownedRooms.filter(room => room !== id);
        findOwnerToDelete.ownedRooms = filteredRooms;
        findOwnerToDelete.save();
      }

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

  async addNewParticipant( { id, owner, newParticipant }: addNewParticipantDto ): Promise<ReturnRoomDto | { msg: string }> {

    try {
      
      const findedRoom = await this.roomModel.findById( id );
      if ( ! findedRoom ) return { msg: 'Room not exist.' };

      const findOwner = await this.userModel.findById( owner );
      if( ! findOwner ) return { msg: 'Owner not exists.' };

      const findNewParticipant = await this.userModel.findById( newParticipant );
      if ( ! findNewParticipant ) return { msg: 'New participant not exist.' };

      if ( ! findedRoom.owners.includes( owner ) ) return { msg: 'You are not the owner of this room' };

      if ( findedRoom.participants.includes( newParticipant ) ) return { msg: 'The user is already a participant of this room.' };
      findedRoom.participants.push( newParticipant );
      findedRoom.save();

      if ( ! findNewParticipant.participantRooms.includes( id ) ) { 
        findNewParticipant.participantRooms.push( id );
        findNewParticipant.save();
       };

      const curatedRoom: ReturnRoomDto = {
        id: findedRoom._id,
        name: findedRoom.name,
        owners: findedRoom.owners,
        participants: findedRoom.participants,
      }

      return curatedRoom;

    } catch (error) {
      throw error;
    }

  }

  async deleteParticipant( { id, owner, participantToDelete }: DeleteParticipantDto ): Promise<ReturnRoomDto | { msg: string }> {

    try {
      
      const findedRoom = await this.roomModel.findById( id );
      if ( ! findedRoom ) return { msg: 'The room not exists.' };
  
      const findParticipant = await this.userModel.findById( participantToDelete );
      if ( ! findParticipant ) return { msg: 'Participant to delete not exists.' };
  
      const findOwner = await this.userModel.findById( owner );
      if ( ! findOwner ) return { msg: 'Owner user not exist' };
  
      if( ! findedRoom.owners.includes( owner ) ) return { msg: 'You are not the owner of this room.' }

      if ( ! findedRoom.participants.includes( participantToDelete ) ) return { msg: 'Given user is not a participant of this room.' };
  
      const filteredParticipants = findedRoom.participants.filter(participant => participant !== participantToDelete);
      findedRoom.participants = filteredParticipants;
      findedRoom.save();

      if ( findParticipant.participantRooms.includes( id ) ) {
        const filteredRooms = findParticipant.participantRooms.filter(room => room !== id);
        findParticipant.participantRooms = filteredRooms;
        findParticipant.save();
      }
  
      const curatedRoom = {
        id: findedRoom._id,
        name: findedRoom.name,
        owners: findedRoom.owners,
        participants: findedRoom.participants,
      }
  
      return curatedRoom;

    } catch (error) {
      throw error;
    }

  }

  async addNewPost( { id, authorId, body, date }: AddNewPostDto ): Promise<{ msg: string }> {

    try {
      
      const room = await this.roomModel.findById( id );

      if ( ! room ) return { msg: 'Room not exist.' };

      const author = await this.userModel.findById( authorId );

      if ( ! author ) return { msg: 'Author user not exist' };

      if ( ! room.owners.includes( authorId ) ) return { msg: 'You are not the owner of this room.' };

      const post = { authorId, body, date };
      
      room.posts.push( post );
      room.save();

      return { msg: 'Post created successfuly.' }

    } catch (error) {
      throw error;
    }

  }

  async addNewBook( { id, ownerId, name, description, link }: AddNewBookDto ): Promise<{ msg: string }> {
    try {

      /**
       * TODO: this is a pattern that is repeated over all the sevice files, so, find the way to optimize it.
       */
      const room = await this.roomModel.findById( id );

      if ( ! room ) return { msg: 'Room not exist.' };

      const owner = await this.userModel.findById( ownerId );

      if ( ! owner ) return { msg: 'Owner user not exist.' };

      if ( ! room.owners.includes( ownerId ) ) return { msg: 'You are not the owner of this room.' };

      const book  = { ownerId, name, description, link };

      await room.books.push( book );
      room.save();

      return { msg: 'Book added successfully' };

    } catch (error) {
      throw error;
    }
  }

  async addNewLink( { id, ownerId, name, link }: AddNewLinkDto ): Promise<{ msg: string }> {
    try {
      
      const room = await this.roomModel.findById( id );

      if ( ! room ) return { msg: 'Room not exist.' };

      const owner = await this.userModel.findById( ownerId );

      if ( ! owner ) return { msg: 'Owner user not exist.' };

      if ( ! room.owners.includes( ownerId ) ) return { msg: 'You are not the owner of this room.' };

      const newLink = { name, link };

      room.links.push( newLink );

      return { msg: 'Link added successfully.' };

    } catch (error) {
      throw error;
    }
  }

}
