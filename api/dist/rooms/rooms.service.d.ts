/// <reference types="multer" />
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
export declare class RoomsService {
    private roomModel;
    private userModel;
    constructor(roomModel: Model<RoomDocument>, userModel: Model<UserDocument>);
    getRooms(): Promise<ReturnRoomDto[]>;
    getRoom(id: string): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    createRoom({ name, password, owner }: CreateRoomDto, authenticatedUser: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    editRoom({ id, name, owner }: EditRoomDto, authenticatedUser: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    deleteRoom(id: string, owner: string, authenticatedUser: any): Promise<{
        msg: string;
    }>;
    addNewOwner({ id, owner, newOwner }: AddNewOwnerDto, authenticatedUser: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    deleteOwner({ id, owner, ownerToDelete }: DeleteOwnerDto, authenticatedUser: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    addNewParticipant({ id, owner, newParticipant }: addNewParticipantDto, authenticatedUser: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    deleteParticipant({ id, owner, participantToDelete }: DeleteParticipantDto, authenticatedUser: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    addNewPost({ id, authorId, body }: AddNewPostDto, authenticatedUser: any, file: Express.Multer.File): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    addNewBook({ id, ownerId, name, description, link }: AddNewBookDto, authenticatedUser: any): Promise<{
        msg: string;
    }>;
    addNewLink({ id, ownerId, name, link }: AddNewLinkDto, authenticatedUser: any): Promise<{
        msg: string;
    }>;
}
