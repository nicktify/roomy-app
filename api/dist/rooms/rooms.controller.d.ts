import { CreateRoomDto } from './dto/create-room-dto';
import { RoomsService } from './rooms.service';
import { ReturnRoomDto } from './dto/return-room-dto';
import { EditRoomDto } from './dto/edit-room-dto';
import { AddNewOwnerDto } from './dto/add-new-owner-dto';
import { DeleteOwnerDto } from './dto/delete-owner-dto';
import { addNewParticipantDto } from './dto/add-new-participant-dto';
import { DeleteParticipantDto } from './dto/delete-participant-dto';
import { AddNewPostDto } from './dto/add-new-post-dto';
import { AddNewBookDto } from './dto/add-new-book-dto';
import { AddNewLinkDto } from './dto/add-new-link-dto';
export declare class RoomsController {
    private readonly roomService;
    constructor(roomService: RoomsService);
    getRooms(): Promise<ReturnRoomDto[]>;
    getRoom({ id }: {
        id: string;
    }): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    postRoom(createRoomDto: CreateRoomDto, req: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    editRoom(room: EditRoomDto, req: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    deleteRoom({ id, owner }: {
        id: string;
        owner: string;
    }, req: any): Promise<{
        msg: string;
    }>;
    addNewOwner(addNewOwnerDto: AddNewOwnerDto, req: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    deleteOwner(deleteOwnerDto: DeleteOwnerDto, req: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    addNewParticipant(addNewParticipantDto: addNewParticipantDto, req: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    deleteParticipant(deleteParticipantDto: DeleteParticipantDto, req: any): Promise<ReturnRoomDto | {
        msg: string;
    }>;
    addNewPost(addNewPostDto: AddNewPostDto, req: any): Promise<{
        msg: string;
    }>;
    addNewBook(addNewBookDto: AddNewBookDto, req: any): Promise<{
        msg: string;
    }>;
    addNewLink(addNewLinkDto: AddNewLinkDto, req: any): Promise<{
        msg: string;
    }>;
}
