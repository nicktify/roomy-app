import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { CreateRoomDto } from './dto/create-room-dto';
import { RoomsService } from './rooms.service';
import { ReturnRoomDto } from './dto/return-room-dto';
import { EditRoomDto } from './dto/edit-room-dto';
import { AddNewOwnerDto } from './dto/add-new-owner-dto';
import { DeleteOwnerDto } from './dto/delete-owner-dto';
import { addNewParticipantDto } from './dto/add-new-participant-dto';
import { DeleteParticipantDto } from './dto/delete-participant-dto';

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
  postRoom( @Body() { name, password, owner, }: CreateRoomDto ): Promise<ReturnRoomDto | { msg: string } > {

    // TODO: fix this
    const room = {
      name,
      password,
      owner,
    }

    return this.roomService.createRoom( room );

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

}
