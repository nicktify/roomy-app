import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';

import { CreateRoomDto } from './dto/create-room-dto';
import { RoomsService } from './rooms.service';
import { ReturnRoomDto } from './dto/return-room-dto';
import { EditRoomDto } from './dto/edit-room-dto';
import { AddNewOwnerDto } from './dto/add-new-owner-dto';
import { DeleteOwnerDto } from './dto/delete-owner-dto';

@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomService: RoomsService) {}

  @Get()
  getRooms(): Promise<ReturnRoomDto[]> {
    return this.roomService.getRooms();
  }

  @Get(':id')
  getRoom( @Body() { id }: { id: string }): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.getRoom(id);
  }

  @Post()
  postRoom(@Body() { name, password, owner, participants }: CreateRoomDto): Promise<ReturnRoomDto | { msg: string } > {

    const room = {
      name,
      password,
      owner,
      participants
    }

    return this.roomService.createRoom(room);

  }

  @Put()
  editRoom( @Body() room: EditRoomDto ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.editRoom(room);
  }

  @Delete()
  deleteRoom( @Body() { id }: { id: string } ): Promise<{ msg: string }> {
    return this.roomService.deleteRoom(id);
  }

  @Post('newowner')
  addNewOwner( @Body() addNewOwnerDto: AddNewOwnerDto ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.addNewOwner(addNewOwnerDto);
  }

  @Delete('deleteowner')
  deleteOwner( @Body() deleteOwnerDto: DeleteOwnerDto ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.deleteOwner(deleteOwnerDto);
  }

}
