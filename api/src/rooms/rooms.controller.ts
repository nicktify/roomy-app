import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { CreateRoomDto } from './dto/create-room-dto';
import { RoomsService } from './rooms.service';
import { ReturnRoomDto } from './dto/return-room-dto';
import { EditRoomDto } from './dto/edit-room-dto';

@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomService: RoomsService) {}

  @Get()
  getRooms(): Promise<ReturnRoomDto[]> {
    return this.roomService.getRooms();
  }

  @Post()
  postRoom(@Body() { name, password, owners, participants }: CreateRoomDto): Promise<ReturnRoomDto> | { msg: string } {

    const room = {
      name,
      password,
      owners,
      participants
    }

    return this.roomService.createRoom(room);

  }

  @Put()
  editRoom( @Body() room: EditRoomDto ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.editRoom(room);
  }

}
