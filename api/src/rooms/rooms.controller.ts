import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { CreateRoomDto } from './dto/create-room-dto';
import { RoomsService } from './rooms.service';
import { ReturnRoomDto } from './dto/return-room-dto';
import { EditRoomDto } from './dto/edit-room-dto';
import { AddNewOwnerDto } from './dto/add-new-owner-dto';
import { DeleteOwnerDto } from './dto/delete-owner-dto';
import { addNewParticipantDto } from './dto/add-new-participant-dto';
import { DeleteParticipantDto } from './dto/delete-participant-dto';
import { AddNewPostDto } from './dto/add-new-post-dto';

@Controller('rooms')
export class RoomsController {

  constructor( private readonly roomService: RoomsService ) {}

  @Get()
  getRooms(): Promise<ReturnRoomDto[]> {
    return this.roomService.getRooms();
  }

  @Get(':id')
  getRoom( @Body() { id }: { id: string } ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.getRoom( id );
  }

  @Post()
  postRoom( @Body() createRoomDto: CreateRoomDto ): Promise<ReturnRoomDto | { msg: string } > {
    return this.roomService.createRoom( createRoomDto );
  }

  @Put()
  editRoom( @Body() room: EditRoomDto ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.editRoom( room );
  }

  @Delete()
  deleteRoom( @Body() { id }: { id: string } ): Promise<{ msg: string }> {
    return this.roomService.deleteRoom( id );
  }

  @Post('newowner')
  addNewOwner( @Body() addNewOwnerDto: AddNewOwnerDto ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.addNewOwner( addNewOwnerDto );
  }

  @Delete('deleteowner')
  deleteOwner( @Body() deleteOwnerDto: DeleteOwnerDto ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.deleteOwner( deleteOwnerDto );
  }

  @Post('newparticipant')
  addNewParticipant( @Body() addNewParticipantDto: addNewParticipantDto ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.addNewParticipant( addNewParticipantDto );
  }

  @Delete('deleteparticipant')
  deleteParticipant( @Body() deleteParticipantDto: DeleteParticipantDto ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.deleteParticipant(deleteParticipantDto);
  }

  @Post('posts')
  addNewPost( @Body() addNewPostDto: AddNewPostDto ): Promise<{ msg: string }> {
    return this.roomService.addNewPost( addNewPostDto )
  }

}
