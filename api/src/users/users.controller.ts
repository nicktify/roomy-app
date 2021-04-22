import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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
}