import { Body, Controller, Delete, Get, Param, Post, Put, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';

import { CreateRoomDto } from './dto/create-room-dto';
import { RoomsService } from './rooms.service';
import { ReturnRoomDto } from './dto/return-room-dto';
import { EditRoomDto } from './dto/edit-room-dto';
import { AddNewOwnerDto } from './dto/add-new-owner-dto';
import { DeleteOwnerDto } from './dto/delete-owner-dto';
import { addNewParticipantDto } from './dto/add-new-participant-dto';
import { DeleteParticipantDto } from './dto/delete-participant-dto';
// import { AddNewPostDto } from './dto/add-new-post-dto';
import { AddNewBookDto } from './dto/add-new-book-dto';
import { AddNewLinkDto } from './dto/add-new-link-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  @Delete()
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

  // @UseGuards( JwtAuthGuard )
  // @Post('posts')
  // @UseInterceptors(FileInterceptor('file'))
  // addNewPost( @Body() addNewPostDto: AddNewPostDto, @Request() req, @UploadedFile() file: Express.Multer.File ): Promise<ReturnRoomDto | { msg: string }> {
  //   return this.roomService.addNewPost( addNewPostDto, req.user, file )
  // }

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

}
