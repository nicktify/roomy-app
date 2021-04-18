import { Body, Controller, Get, Post } from '@nestjs/common';
import {CreateRoomDto} from './dto/create-room-dto';
/*import { User } from '../users/interfaces/user.interface';*/
import { RoomsService } from './rooms.service';
import { Room } from './schemas/room.schema';


@Controller('room')
export class RoomController {

  constructor(private readonly roomService: RoomsService) {}

  @Get()
  getRoom(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Post()
  postRoom(@Body() createRoomDto: CreateRoomDto): Promise<Room> | { msg: string } {

    if (!createRoomDto.name) return { msg: 'Name is mandatory' }
    if (!createRoomDto.owner) return { msg: 'Owner is mandatory' }
    if (!createRoomDto.password) return { msg: 'Password is mandatory' }

    delete createRoomDto.owner

    return this.roomService.createRoom(createRoomDto);
  }

}
