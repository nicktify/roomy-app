import { Controller, Delete, Get, Post, Put, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { FindByEmailDto } from './dto/find-by-email-dto';
import { ReturnUserDto } from './dto/return-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(): Promise<ReturnUserDto[]> | { msg: string } {
    return this.usersService.getUsers();
  }

  @Get('/id')
  getUser( @Body() { id }: { id: string } ): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.getUser(id);
  }

  @Post()
  postUser( @Body() createUserDto: CreateUserDto ): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.createUser(createUserDto);
  }

  @Put()
  editUser( @Body() user: EditUserDto ): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.editUser(user);
  }

  @Delete()
  deleteUser( @Body() { id }: { id: string } ): Promise<{ msg: string }> {
    return this.usersService.deleteUser(id);
  }

  @Get('email')
  getByEmail( @Body() email: FindByEmailDto ): Promise<ReturnUserDto | { msg: string }> {
    return this.usersService.getByEmail(email);
  }
}