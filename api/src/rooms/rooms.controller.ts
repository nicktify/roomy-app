import { Body, Controller, Get, Post, Put } from '@nestjs/common';

import { CreateRoomDto } from './dto/create-room-dto';
import { RoomsService } from './rooms.service';
import { Room } from './interfaces/room-interface';
import { ReturnRoomDto } from './dto/return-room-dto';
import { EditRoomDto } from './dto/edit-room-dto';

@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomService: RoomsService) {}

  @Get()
  getRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Post()
  postRoom(@Body() { name, password, userId }: CreateRoomDto): Promise<Room> | { msg: string } {

    const room = {
      userId,
      name,
      password,
    }

    return this.roomService.createRoom(room, userId);
  }

  @Put()
  editRoom( @Body() room: EditRoomDto ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.editRoom(room);
  }

}
