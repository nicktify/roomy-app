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
import { PostDocument } from 'src/posts/schemas/post.schema';
import { ReturnPostDto } from 'src/posts/dto/return-post-dto';
import { ForumPostDocument } from 'src/forum/schemas/forum-post.schema';
import { ReturnForumPostDto } from 'src/forum/dto/return-forum-post.dto';
import { RenameRoomDto } from './dto/rename-room-dto';
export declare class RoomsService {
    private roomModel;
    private userModel;
    private postModel;
    private forumPostModel;
    constructor(roomModel: Model<RoomDocument>, userModel: Model<UserDocument>, postModel: Model<PostDocument>, forumPostModel: Model<ForumPostDocument>);
    getRooms(): Promise<ReturnRoomDto[]>;
    getRoom(id: string): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    createRoom({ name, owner }: CreateRoomDto, authenticatedUser: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    editRoom({ id, name, owner }: EditRoomDto, authenticatedUser: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    renameRoom({ newName, roomId }: RenameRoomDto): Promise<{
        msg: string;
    } | ReturnRoomDto>;
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
    addNewBook({ id, ownerId, name, description, link }: AddNewBookDto, authenticatedUser: any): Promise<{
        msg: string;
    }>;
    addNewLink({ id, ownerId, name, link }: AddNewLinkDto, authenticatedUser: any): Promise<{
        msg: string;
    }>;
    getAllUsersFromRoom(roomId: string): Promise<ReturnUserDto[] | {
        msg: string;
    }>;
    deleteUserFromRoom({ roomId, userId }: DeleteUserFromRoomDto): Promise<{
        msg: string;
    }>;
    makeUserOwner({ userId, roomId }: {
        userId: any;
        roomId: any;
    }): Promise<{
        msg: string;
    }>;
    makeUserParticipant({ userId, roomId }: {
        userId: any;
        roomId: any;
    }): Promise<{
        msg: string;
    }>;
    getAllRoomsFromUser({ userId }: GetAllRoomsFromUserDto): Promise<ReturnRoomDto[] | {
        msg: string;
    }>;
    getAllRoomInformation({ roomId }: {
        roomId: any;
    }): Promise<{
        posts: ReturnPostDto[];
        users: ReturnUserDto[];
        forumPosts: ReturnForumPostDto[];
    } | {
        msg: string;
    }>;
}
