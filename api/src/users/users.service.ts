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
        role: user.role,
        ownedRooms: user.ownedRooms,
        participantRooms: user.participantRooms,
      }
    });

    return curatedUsers;

  }
  
  
  async getUser( id: string ): Promise<ReturnUserDto | { msg: string }> {
  
    if (!id) return { msg: 'Id is mandatory.' };
  
    const findedUser = await this.userModel.findById(id);

    if (!findedUser) return { msg: 'User not exists.' }
  
    return {
      id: findedUser._id,
      name: findedUser.name,
      email: findedUser.email,
      role: findedUser.role,
      ownedRooms: findedUser.ownedRooms,
      participantRooms: findedUser.participantRooms,
    }
  
  }

  async createUser( user: CreateUserDto ): Promise<ReturnUserDto | { msg: string }> {
    
    try {

      const findedUser = await this.userModel.findOne({email: user.email});
      if (findedUser) return { msg: 'User already exist.' };
      
      const createdUser = await this.userModel.create(user);
      return {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        ownedRooms: createdUser.ownedRooms,
        participantRooms: createdUser.participantRooms,
      }

    } catch (error) {
      console.log(error);
    }

  }

  async editUser( user: EditUserDto ): Promise<ReturnUserDto | { msg: string }> {

    const findedUser = await this.userModel.findById(user.id);
    if (!findedUser) {
      return { msg: 'User not exist.' };
    }

    try {

      await this.userModel.updateOne({ _id: user.id }, {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });

      const editedUser = await this.userModel.findById(user.id);

      return {
        id: editedUser._id,
        name: editedUser.name,
        email: editedUser.email,
        role: editedUser.role,
        ownedRooms: editedUser.ownedRooms,
        participantRooms: editedUser.participantRooms,
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser( id: string ): Promise<{ msg: string }> {

    try {

      await this.userModel.deleteOne({_id: id});
      return { msg: 'User deleted.' };

    } catch (error) {
      console.log(error);
    }

  }

}
