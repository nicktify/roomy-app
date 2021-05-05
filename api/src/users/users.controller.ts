import { Controller, Delete, Get, Post, Put, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

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
  postUser( @Body() createUserDto: CreateUserDto ): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.createUser( createUserDto );
  }

  @UseGuards( JwtAuthGuard )
  @Put()
  editUser( @Body() user: EditUserDto, @Request() req ): Promise<ReturnUserDto | { msg: string }> | { msg: string } {
    console.log(req)
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
    return this.usersService.validateUser(req.user);
  }

}