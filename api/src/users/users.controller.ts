import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUser(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Post()
  postUser(@Body() createUserDto: CreateUserDto): Promise<User> | { msg: string } {
    
    if (!createUserDto.name) return { msg: 'Name is mandatory.'}
    if (!createUserDto.email) return { msg: 'Email is mandatory.'}
    if (!createUserDto.password) return { msg: 'Password is mandatory.'}
    if (!createUserDto.role) return { msg: 'Role is mandatory.'}

    return this.usersService.createUser(createUserDto);
  }
}
