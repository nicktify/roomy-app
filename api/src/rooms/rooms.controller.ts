import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room-dto';
import { RoomsService } from './rooms.service';
import { ReturnRoomDto } from './dto/return-room-dto';
import { EditRoomDto } from './dto/edit-room-dto';
import { AddNewOwnerDto } from './dto/add-new-owner-dto';
import { DeleteOwnerDto } from './dto/delete-owner-dto';
import { addNewParticipantDto } from './dto/add-new-participant-dto';
import { DeleteParticipantDto } from './dto/delete-participant-dto';
import { AddNewBookDto } from './dto/add-new-book-dto';
import { AddNewLinkDto } from './dto/add-new-link-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ReturnUserDto } from 'src/users/dto/return-user.dto';
import { GetAllUsersFromRoomDto } from './dto/get-all-users-from-room.dto';
import { DeleteUserFromRoomDto } from './dto/delete-user-from-room.dto';
import { MakeUserParticipantOrOwnerDto } from './dto/make-user-participant-or-owner.dto';
import { GetAllRoomsFromUserDto } from './dto/get-all-rooms-from-user.dto';
import { GetAllRoomInformation } from './dto/get-all-room-information';


@Controller('rooms')
export class RoomsController {
  constructor( private readonly roomService: RoomsService ) {}


  @Get()
  getRooms(): Promise<ReturnRoomDto[]> {
    return this.roomService.getRooms();
  }


  @UseGuards( JwtAuthGuard )
  @Get('user-room/:id')
  getRoom( @Param() { id }: { id: string } ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.getRoom( id );
  }


  @UseGuards( JwtAuthGuard )
  @Post()
  postRoom( @Body() createRoomDto: CreateRoomDto, @Request() req ): Promise<ReturnRoomDto | { msg: string } > {
    return this.roomService.createRoom( createRoomDto, req.user );
  }


  @UseGuards( JwtAuthGuard )
  @Put()
  editRoom( @Body() room: EditRoomDto, @Request() req ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.editRoom( room, req.user );
  }


  @UseGuards( JwtAuthGuard )
  @Delete('delete-room')
  deleteRoom( @Body() { id, owner }: { id: string, owner: string }, @Request() req ): Promise<{ msg: string }> {
    return this.roomService.deleteRoom( id, owner, req.user );
  }


  @UseGuards( JwtAuthGuard )
  @Post('newowner')
  addNewOwner( @Body() addNewOwnerDto: AddNewOwnerDto, @Request() req ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.addNewOwner( addNewOwnerDto, req.user );
  }


  @UseGuards( JwtAuthGuard )
  @Delete('deleteowner')
  deleteOwner( @Body() deleteOwnerDto: DeleteOwnerDto, @Request() req ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.deleteOwner( deleteOwnerDto, req.user );
  }


  @UseGuards( JwtAuthGuard )
  @Post('newparticipant')
  addNewParticipant( @Body() addNewParticipantDto: addNewParticipantDto, @Request() req ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.addNewParticipant( addNewParticipantDto, req.user );
  }


  @UseGuards( JwtAuthGuard )
  @Delete('deleteparticipant')
  deleteParticipant( @Body() deleteParticipantDto: DeleteParticipantDto, @Request() req ): Promise<ReturnRoomDto | { msg: string }> {
    return this.roomService.deleteParticipant( deleteParticipantDto, req.user );
  }


  @UseGuards( JwtAuthGuard )
  @Post('books')
  addNewBook( @Body() addNewBookDto: AddNewBookDto, @Request() req ): Promise<{ msg: string }> {
    return this.roomService.addNewBook( addNewBookDto, req.user );
  }


  @UseGuards( JwtAuthGuard )
  @Post('links')
  addNewLink( @Body() addNewLinkDto: AddNewLinkDto, @Request() req ): Promise<{ msg: string }> {
    return this.roomService.addNewLink( addNewLinkDto, req.user );
  }


  @UseGuards( JwtAuthGuard )
  @Get('get-all-users-from-room/:roomId')
  getAllUsersFromRoom( @Param() { roomId }: GetAllUsersFromRoomDto ): Promise<ReturnUserDto[] | {msg: string}> {
    return this.roomService.getAllUsersFromRoom( roomId )
  }


  @UseGuards( JwtAuthGuard )
  @Delete('delete-user-from-room')
  deleteUserFromRoom( @Body() deleteUserFromRoomDto: DeleteUserFromRoomDto ): Promise<{msg: string}> {
    return this.roomService.deleteUserFromRoom( deleteUserFromRoomDto );
  }


  @UseGuards( JwtAuthGuard )
  @Put('make-user-owner-of-room')
  makeUserOwner( @Body() makeUserOwnerOfRoomDto: MakeUserParticipantOrOwnerDto ): Promise<{msg: string}> {
    return this.roomService.makeUserOwner( makeUserOwnerOfRoomDto );
  }


  @UseGuards( JwtAuthGuard )
  @Put('make-user-participant-of-room')
  makeUserParticipant( @Body() makeUserParticipantOfRoomDto: MakeUserParticipantOrOwnerDto ): Promise<{msg: string}> {
    return this.roomService.makeUserParticipant( makeUserParticipantOfRoomDto );
  }


  @UseGuards( JwtAuthGuard )
  @Get('get-all-rooms-from-user/:userId')
  getAllRoomsFromUser(@Param() userId: GetAllRoomsFromUserDto): Promise<ReturnRoomDto[] | {msg: string}> {
    return this.roomService.getAllRoomsFromUser(userId);
  }


  @UseGuards( JwtAuthGuard )
  @Get('get-all-room-information/:roomId')
  getAllRoomInformation(@Param() roomId: GetAllRoomInformation): Promise<any> {
    return this.roomService.getAllRoomInformation(roomId);
  }

}
