import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { ReturnUserDto } from './dto/return-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserDocument } from './schemas/user.schema';
import { FindByEmailDto } from './dto/find-by-email-dto';

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
  
    if ( ! id ) return { msg: 'Id is mandatory.' };
  
    const findedUser = await this.userModel.findById( id );

    if ( ! findedUser ) return { msg: 'User not exists.' }
  
    const curatedUser = {
      id: findedUser._id,
      name: findedUser.name,
      email: findedUser.email,
      role: findedUser.role,
      ownedRooms: findedUser.ownedRooms,
      participantRooms: findedUser.participantRooms,
    }

    return curatedUser;
  
  }

  async createUser( { name, email, password, role}: CreateUserDto ): Promise<ReturnUserDto | { msg: string }> {
    
    try {

      const  user  = await this.userModel.findOne({ email: email });
      
      if ( user ) return { msg: 'User already exist.' };

      const saltOrRounds = 10;

      const hash = await bcrypt.hash( password, saltOrRounds );
      
      const createdUser = await this.userModel.create({ name, email, password: hash, role });

      const curatedUser = {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        ownedRooms: createdUser.ownedRooms,
        participantRooms: createdUser.participantRooms,
      }

      return curatedUser;

    } catch ( error ) {
      throw error;
    }

  }

  async editUser( { id, name, email, password, role}: EditUserDto ): Promise<ReturnUserDto | { msg: string }> {

    try {
      
      const user = await this.userModel.findById( id );

      if ( ! user ) return { msg: 'User not exist.' };

      await this.userModel.updateOne({ _id: id }, { name, email, password, role });

      const editedUser = await this.userModel.findById( id );

      const curatedUser = {
        id: editedUser._id,
        name: editedUser.name,
        email: editedUser.email,
        role: editedUser.role,
        ownedRooms: editedUser.ownedRooms,
        participantRooms: editedUser.participantRooms,
      }
      
      return curatedUser;
      
    } catch ( error ) {
      throw error;
    }
  }

  async deleteUser( id: string ): Promise<{ msg: string }> {

    try {

      await this.userModel.deleteOne({ _id: id });
      return { msg: 'User deleted.' };

    } catch ( error ) {
      throw error;
    }

  }

  async getByEmail( email: FindByEmailDto ): Promise<ReturnUserDto | { msg: string }> {
    
    try {
      
      const user = await this.userModel.findOne(email);

      if ( !user ) return { msg: 'User not exist.' };

      const curatedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        ownedRooms: user.ownedRooms,
        participantRooms: user.participantRooms,
      }

      return curatedUser;

    } catch ( error ) {
      throw error;
    }
  }

  async login( { email, password } ): Promise<ReturnUserDto | { msg: string }> {
    try {

      const user = await this.userModel.findOne({ email });

      const result = await bcrypt.compare( password, user.password );

      if ( ! result ) return { msg: 'Email or password incorrect.' };

      const curatedUser = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        ownedRooms: user.ownedRooms,
        participantRooms: user.participantRooms
      }

      return curatedUser;
      
    } catch ( error ) {
      throw error;
    }
  }

}
