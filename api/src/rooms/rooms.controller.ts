import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateRoomDto } from './dto/create-room-dto';
import { RoomsService } from './rooms.service';
import { Room } from './interfaces/room-interface';

@Controller('rooms')
export class RoomsController {

  constructor(private readonly roomService: RoomsService) {}

  @Get()
  getRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Post()
  postRoom(@Body() { name, password, userId }: CreateRoomDto): Promise<Room> | { msg: string } {

    if (!name) return { msg: 'Name is mandatory' };
    if (!password) return { msg: 'Password is mandatory' };
    
    const room = {
      name: name,
      password: password,
      participants: []
    }

    return this.roomService.createRoom(room, userId);
  }

}
