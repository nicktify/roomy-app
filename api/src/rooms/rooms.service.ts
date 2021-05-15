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
import { AddNewBookDto } from './dto/add-new-book-dto';
import { AddNewLinkDto } from './dto/add-new-link-dto';
import { ReturnUserDto } from 'src/users/dto/return-user.dto';
import { DeleteUserFromRoomDto } from './dto/delete-user-from-room.dto';
import { GetAllRoomsFromUserDto } from './dto/get-all-rooms-from-user.dto';
import { Room } from './interfaces/room-interface';

@Injectable()
export class RoomsService {
  constructor( @InjectModel('Room') private roomModel: Model<RoomDocument>, @InjectModel('User') private userModel: Model<UserDocument> ) {}

  async getRooms(): Promise<ReturnRoomDto[]> {

    const rooms = await this.roomModel.find();
    return rooms.map(room =>  ({ 
      id: room._id, 
      name: room.name, 
      owners: room.owners, 
      participants: room.participants ,
      links: room.links,
      dates: room.dates,
      posts: room.posts,
      books: room.books,
    }))

  }

  async getRoom( id: string ): Promise<ReturnRoomDto | { msg: string }> {

    if ( ! id ) return { msg: 'Id should not be empty.' }

    try {

      const findedRoom = await this.roomModel.findById( id );
      if ( ! findedRoom ) return { msg: 'Room not exist.'};

      return {
        id: findedRoom._id,
        name: findedRoom.name, 
        owners: findedRoom.owners, 
        participants: findedRoom.participants,
        links: findedRoom.links,
        dates: findedRoom.dates,
        posts: findedRoom.posts,
        books: findedRoom.books,
      };

    } catch ( error ) {
      throw error;
    }
  }

  async createRoom( { name, password, owner }: CreateRoomDto, authenticatedUser ): Promise<ReturnRoomDto | { msg: string }> {

    try {

      const findOwner = await this.userModel.findById( owner );
      if ( ! findOwner ) return { msg: 'User not exist.' };

      if ( owner !== authenticatedUser.userId ) return { msg: 'You don\'t have the authorization to do this action.' };

      const createdRoom = await this.roomModel.create({ name, password, owners: owner });

      findOwner.ownedRooms.push(createdRoom._id);
      findOwner.save();
      
      return { 
        id: createdRoom._id, 
        name: createdRoom.name, 
        owners: createdRoom.owners, 
        participants: createdRoom.participants,
        links: createdRoom.links,
        dates: createdRoom.dates,
        posts: createdRoom.posts,
        books: createdRoom.books,
      };
      
    } catch ( error ) {
      throw error;
    }

  }

  async editRoom( { id, name, owner }: EditRoomDto, authenticatedUser ): Promise<ReturnRoomDto | { msg: string }> {

    try {

      const room = await this.roomModel.findById( id );
      if ( ! room ) return { msg: 'Room not exist.' }

      const user = await this.userModel.findById( owner );
      if ( ! user ) return { msg: 'User not exist.' };

      if ( owner !== authenticatedUser.userId ) return { msg: 'You don\'t have the authorization to do this action.' };
      
      await this.roomModel.updateOne( { _id: id }, { name } );
      const editedRoom = await this.roomModel.findById( id );
      return { 
        id: editedRoom._id, 
        name: editedRoom.name, 
        owners: editedRoom.owners, 
        participants: editedRoom.participants,
        links: editedRoom.links,
        dates: editedRoom.dates,
        posts: editedRoom.posts,
        books: editedRoom.books,
      };

    } catch ( error ) {
      throw error;
    }

  }

  async deleteRoom( id: string, owner: string, authenticatedUser ): Promise<{ msg: string }> {

    try {

      const user = await this.userModel.findById( owner );
      if ( ! user ) return { msg: 'User not exist.' };

      if ( owner !== authenticatedUser.userId ) return { msg: 'You don\'t have the authorization to do this action.' };

      const roomToDelete = await this.roomModel.findById( id );

      for (let i = 0; i < roomToDelete.owners.length; i ++) {
        const owner = await this.userModel.findById( roomToDelete.owners[i] );
        if ( owner ) {
          owner.ownedRooms = owner.ownedRooms.filter( room => room != id );
          owner.save();
        }
      }
      
      for (let i = 0; i < roomToDelete.participants.length; i ++) {
        const participant = await this.userModel.findById( roomToDelete.participants[i] );
        if ( participant ) {
          participant.participantRooms = participant.participantRooms.filter( room => room !== id );
          participant.save();
        }
      }

      await this.roomModel.deleteOne({ _id: id });
      return { msg: 'Room has been deleted.' };

    } catch ( error ) {
      throw error;
    }

  }

  async addNewOwner( { id, owner, newOwner }: AddNewOwnerDto, authenticatedUser ): Promise<ReturnRoomDto | { msg: string }> {

    try {

      const findedRoom = await this.roomModel.findById( id );
      if ( ! findedRoom ) return { msg: 'The room not exists.' };
  
      const findNewUser = await this.userModel.findById( newOwner );
      if ( ! findNewUser ) return { msg: 'New user not exists.' };
  
      const findOwner = await this.userModel.findById( owner );
      if ( ! findOwner ) return { msg: 'Owner user not exist' };

      if ( owner !== authenticatedUser.userId ) return { msg: 'You don\'t have the authorization to do this action.' };
  
      if( ! findedRoom.owners.includes( owner ) ) return { msg: 'You are not the owner of this room.' }

      if ( findedRoom.owners.includes( newOwner ) ) return { msg: 'Given user is already an owner of this room.' };
  
      findedRoom.owners.push( newOwner );
      findedRoom.save();

      if ( ! findNewUser.ownedRooms.includes( id ) ) { 
        findNewUser.ownedRooms.push( id );
        findNewUser.save();
      }
  
      return { 
        id: findedRoom._id, 
        name: findedRoom.name, 
        owners: findedRoom.owners, 
        participants: findedRoom.participants,
        links: findedRoom.links,
        dates: findedRoom.dates,
        posts: findedRoom.posts,
        books: findedRoom.books,
      };
      
    } catch ( error ) {
      throw error;
    }

  }

  async deleteOwner( { id, owner, ownerToDelete }: DeleteOwnerDto, authenticatedUser ): Promise<ReturnRoomDto | { msg: string }> {

    try {

      const findedRoom = await this.roomModel.findById( id );
      if ( ! findedRoom ) return { msg: 'Room not exist.' };

      const findOwner = await this.userModel.findById( owner );
      if( ! findOwner ) return { msg: 'Owner not exist.' };

      if ( owner !== authenticatedUser.userId ) return { msg: 'You don\'t have the authorization to do this action.' };

      const findOwnerToDelete = await this.userModel.findById( ownerToDelete );
      if ( ! findOwnerToDelete ) return { msg: 'Owner to delete not exist' };

      if ( ! findedRoom.owners.includes( owner ) ) return { msg: 'You are not the owner of this room.' };
      
      if ( ! findedRoom.owners.includes( ownerToDelete ) ) return { msg: 'Given user is not an owner of this room.' };
      const filteredOwners = findedRoom.owners.filter( owner => owner !== ownerToDelete );
      findedRoom.owners = filteredOwners;
      findedRoom.save();

      if ( findOwnerToDelete.ownedRooms.includes( id ) ) {
        const filteredRooms = findOwnerToDelete.ownedRooms.filter( room => room !== id );
        findOwnerToDelete.ownedRooms = filteredRooms;
        findOwnerToDelete.save();
      }

      return { 
        id: findedRoom._id, 
        name: findedRoom.name, 
        owners: findedRoom.owners, 
        participants: findedRoom.participants,
        links: findedRoom.links,
        dates: findedRoom.dates,
        posts: findedRoom.posts,
        books: findedRoom.books,
      };
      
    } catch ( error ) {
      throw error;
    }
  }

  async addNewParticipant( { id, owner, newParticipant }: addNewParticipantDto, authenticatedUser ): Promise<ReturnRoomDto | { msg: string }> {

    try {
      
      const findedRoom = await this.roomModel.findById( id );
      if ( ! findedRoom ) return { msg: 'Room not exist.' };

      const findOwner = await this.userModel.findById( owner );
      if( ! findOwner ) return { msg: 'Owner not exists.' };

      if ( owner !== authenticatedUser.userId ) return { msg: 'You don\'t have the authorization to do this action.' };

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

      return { 
        id: findedRoom._id, 
        name: findedRoom.name, 
        owners: findedRoom.owners, 
        participants: findedRoom.participants,
        links: findedRoom.links,
        dates: findedRoom.dates,
        posts: findedRoom.posts,
        books: findedRoom.books,
      };

    } catch ( error ) {
      throw error;
    }

  }

  async deleteParticipant( { id, owner, participantToDelete }: DeleteParticipantDto, authenticatedUser ): Promise<ReturnRoomDto | { msg: string }> {

    try {
      
      const findedRoom = await this.roomModel.findById( id );
      if ( ! findedRoom ) return { msg: 'The room not exists.' };
  
      const findParticipant = await this.userModel.findById( participantToDelete );
      if ( ! findParticipant ) return { msg: 'Participant to delete not exists.' };
  
      const findOwner = await this.userModel.findById( owner );
      if ( ! findOwner ) return { msg: 'Owner user not exist' };

      if ( owner !== authenticatedUser.userId ) return { msg: 'You don\'t have the authorization to do this action.' };
  
      if( ! findedRoom.owners.includes( owner ) ) return { msg: 'You are not the owner of this room.' }

      if ( ! findedRoom.participants.includes( participantToDelete ) ) return { msg: 'Given user is not a participant of this room.' };
  
      const filteredParticipants = findedRoom.participants.filter( participant => participant !== participantToDelete );
      findedRoom.participants = filteredParticipants;
      findedRoom.save();

      if ( findParticipant.participantRooms.includes( id ) ) {
        const filteredRooms = findParticipant.participantRooms.filter( room => room !== id );
        findParticipant.participantRooms = filteredRooms;
        findParticipant.save();
      }
  
      return {
        id: findedRoom._id, 
        name: findedRoom.name, 
        owners: findedRoom.owners, 
        participants: findedRoom.participants,
        links: findedRoom.links,
        dates: findedRoom.dates,
        posts: findedRoom.posts,
        books: findedRoom.books,
      };

    } catch ( error ) {
      throw error;
    }
  }

  async addNewBook( { id, ownerId, name, description, link }: AddNewBookDto, authenticatedUser ): Promise<{ msg: string }> {
    try {

      const room = await this.roomModel.findById( id );
      if ( ! room ) return { msg: 'Room not exist.' };

      const owner = await this.userModel.findById( ownerId );
      if ( ! owner ) return { msg: 'Owner user not exist.' };

      if ( ownerId !== authenticatedUser.userId ) return { msg: 'You don\'t have the authorization to do this action.' };

      if ( ! room.owners.includes( ownerId ) ) return { msg: 'You are not the owner of this room.' };

      const book  = { ownerId, name, description, link };
      await room.books.push( book );
      room.save();

      return { msg: 'Book added successfully' };

    } catch ( error ) {
      throw error;
    }
  }

  async addNewLink( { id, ownerId, name, link }: AddNewLinkDto, authenticatedUser ): Promise<{ msg: string }> {
    try {
      
      const room = await this.roomModel.findById( id );
      if ( ! room ) return { msg: 'Room not exist.' };

      const owner = await this.userModel.findById( ownerId );
      if ( ! owner ) return { msg: 'Owner user not exist.' };

      if ( ownerId !== authenticatedUser.userId ) return { msg: 'You don\'t have the authorization to do this action.' };

      if ( ! room.owners.includes( ownerId ) ) return { msg: 'You are not the owner of this room.' };

      const newLink = { name, link };
      room.links.push( newLink );
      room.save();

      return { msg: 'Link added successfully.' };

    } catch ( error ) {
      throw error;
    }
  }

  async getAllUsersFromRoom( roomId: string ): Promise<ReturnUserDto[] | { msg: string }> {
    try {
      const room = await this.roomModel.findById( roomId );

      if (!room) return {msg: 'Room not exist.'};

      const users = [];

      for (let i = 0; i < room.owners.length; i ++) {
        const user = await this.userModel.findById(room.owners[i]);
        if (user) {
          users.push({
            id: user._id,
            name: user.name,
            email: user.email,
            about: user.about,
            ownedRooms: user.ownedRooms,
            participantRooms: user.participantRooms,
            profilePicture: user.profilePicture,
            profileBackground: user.profileBackground,
            socialMediaLinks: user.socialMediaLinks,
          });
        }
      }

      for (let i = 0; i < room.participants.length; i ++) {
        const user = await this.userModel.findById(room.participants[i]);
        if (user) {
          users.push({
            id: user._id,
            name: user.name,
            email: user.email,
            about: user.about,
            ownedRooms: user.ownedRooms,
            participantRooms: user.participantRooms,
            profilePicture: user.profilePicture,
            profileBackground: user.profileBackground,
            socialMediaLinks: user.socialMediaLinks,
          });
        }
      }

      users.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1

        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1

        return 0;
      })
      
      return users;

    } catch (error) {
      throw error;
    }
  }

  async deleteUserFromRoom({ roomId, userId }: DeleteUserFromRoomDto): Promise<{msg: string}> {
    try {
      const user = await this.userModel.findById( userId );
      if (!user) return {msg: 'User not exist.'}

      const room = await this.roomModel.findById( roomId );
      if (!room) return {msg: 'Room not exist.'}

      room.owners = room.owners.filter(owner => owner !== userId)
      room.participants = room.participants.filter(participant => participant !== userId)
      room.save();

      return {msg: 'User deleted from room.'};

    } catch (error) {
      throw error;
    }
  }


  async makeUserOwner({ userId, roomId }): Promise<{ msg: string }> {
    try {
      const user = await this.userModel.findById( userId );
      if(!user) return {msg: 'User not exist.'}
      const room = await this.roomModel.findById( roomId );
      if (!room) return {msg: 'Room not exist'};

      if (!room.owners.includes(userId)) {
        room.owners.push(userId);
      }
      room.participants = room.participants.filter(participant => participant !== userId);
      room.save();
      
      if (!user.ownedRooms.includes(roomId)) {
        user.ownedRooms.push(roomId);
      }
      user.participantRooms = user.participantRooms.filter(room => room !== roomId);
      user.save();

      return {msg: 'User now is owner of the room'}
    } catch (error) {
      throw error;
    }
  }

  async makeUserParticipant({ userId, roomId }): Promise<{msg: string}> {
    try {
      const user = await this.userModel.findById( userId );
      if(!user) return {msg: 'User not exist.'}
      const room = await this.roomModel.findById( roomId );
      if (!room) return {msg: 'Room not exist'};

      if (!room.participants.includes(userId)) {
        room.participants.push(userId);
      }
      room.owners = room.owners.filter(owner => owner !== userId);
      room.save();

      if (!user.participantRooms.includes(roomId)) {
        user.participantRooms.push(roomId);
      }
      user.ownedRooms = user.ownedRooms.filter(room => room !== roomId);
      user.save();

      return {msg: 'User now is participant of the room.'}
    } catch (error) {
      throw error;
    }
  }

  async getAllRoomsFromUser({userId}: GetAllRoomsFromUserDto): Promise<ReturnRoomDto[] | {msg: string}> {

    try {
      const user = await this.userModel.findById(userId);
      if (!user) return {msg: 'User not exist.'};

      let rooms: ReturnRoomDto[] = [];

      for (let i = 0; i < user.ownedRooms.length; i ++) {
        const room = await this.roomModel.findById(user.ownedRooms[i]);
        rooms.push({
          id: room._id,
          name: room.name,
          owners: room.owners,
          participants: room.participants,
          links: room.links,
          dates: room.dates,
          posts: room.posts,
          books: room.books,
        });
      }

      for (let i = 0; i < user.participantRooms.length; i ++) {
        const room = await this.roomModel.findById(user.participantRooms[i]);
        rooms.push({
          id: room._id,
          name: room.name,
          owners: room.owners,
          participants: room.participants,
          links: room.links,
          dates: room.dates,
          posts: room.posts,
          books: room.books,
        });
      }

      rooms.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1

        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1

        return 0;
      })

      return rooms;

    } catch (error) {
      throw error;
    }
  }
}
