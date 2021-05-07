import { Controller, Delete, Get, Post, Put, Body, UseGuards, Request, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { FindByEmailDto } from './dto/find-by-email-dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor( private usersService: UsersService, private authService: AuthService ) {}

  // @UseGuards( JwtAuthGuard )
  @Get()
  getUsers(): Promise<ReturnUserDto[]> | { msg: string } {
    return this.usersService.getUsers();
  }

  @Get('/id')
  getUser( @Body() { id }: { id: string } ): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.getUser( id );
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  postUser( @Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.createUser( createUserDto, file );
  }

  @UseGuards( JwtAuthGuard )
  @Post('/add-profile-picture')
  @UseInterceptors(FileInterceptor('file'))
  addPicture( @Body() userId: { userId: string }, @UploadedFile() file: Express.Multer.File,  @Request() req ): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.addProfilePicture( userId, file, req.user );
  }

  @UseGuards( JwtAuthGuard )
  @Put()
  editUser( @Body() user: EditUserDto, @Request() req ): Promise<ReturnUserDto | { msg: string }> | { msg: string } {
    return this.usersService.editUser( user, req.user );
  }

  @UseGuards( JwtAuthGuard )
  @Delete()
  deleteUser( @Body() { id }: { id: string }, @Request() req ): Promise<{ msg: string }> {
    return this.usersService.deleteUser( id, req.user );
  }

  @Get('email')
  getByEmail( @Body() email: FindByEmailDto ): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.getByEmail( email );
  }

  @UseGuards( AuthGuard('local') )
  @Post('auth/login')
  async login( @Request() req ) {
    return this.authService.login(req.user);
  }

  @UseGuards( JwtAuthGuard )
  @Post('auth/validate-token')
  async validateToken( @Request() req ) {
    return this.authService.validateToken( req.user )
  }

}