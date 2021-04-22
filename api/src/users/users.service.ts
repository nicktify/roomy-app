import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReturnUserDto } from './dto/return-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}
  
  async getUsers(): Promise<ReturnUserDto[]> {

    const users = await this.userModel.find();

    const curatedUsers: ReturnUserDto[] = users.map(user => {
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        rooms: user.rooms,
        role: user.role,
      }
    })

    return curatedUsers;

  }
  
  
  async getUser( id: string ): Promise<ReturnUserDto | { msg: string }> {
  
    if (!id) return { msg: 'Id is mandatory.' };
  
    const findedUser = await this.userModel.findById(id);
  
    return {
      id: findedUser._id,
      name: findedUser.name,
      email: findedUser.email,
      rooms:findedUser.rooms,
      role: findedUser.role,
    }
  
  }

  async createUser( user: CreateUserDto ): Promise<ReturnUserDto | { msg: string }> {

    if (!user.name) return { msg: 'Name is mandatory.'};
    if (!user.email) return { msg: 'Email is mandatory.'};
    if (!user.password) return { msg: 'Password is mandatory.'};
    if (!user.role) return { msg: 'Role is mandatory.'};

    
    try {

      const findedUser = await this.userModel.findOne({email: user.email});
      
      if (findedUser) return { msg: 'User already exist.' };
      
      const createdUser = await this.userModel.create(user);

      return {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        rooms: createdUser.rooms,
        role: createdUser.role,
      }

    } catch (error) {

      throw 'Something went wrong, pls try again';

    }

  }

  async editUser( user: EditUserDto ): Promise<ReturnUserDto> {
    try {

      await this.userModel.updateOne(user);

      const editedUser = await this.userModel.findById(user.id);
      
      return {
        id: editedUser._id,
        name: editedUser.name,
        email: editedUser.email,
        rooms: editedUser.rooms,
        role: editedUser.role,
      }
      
    } catch (error) {
      throw 'Something went wrong.';
    }
  }

  async deleteUser( id: string ): Promise<{ msg: string }> {

    try {

      await this.userModel.deleteOne({_id: id});
      return { msg: 'User has been deleted.' };

    } catch (error) {

      console.log(error);
      return { msg: 'Something went wrong.'};

    }

  }

}
