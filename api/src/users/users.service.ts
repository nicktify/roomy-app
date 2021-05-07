import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');

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

    return users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      ownedRooms: user.ownedRooms,
      participantRooms: user.participantRooms,
      profilePicture: user.profilePicture,
    }));
  }

  async getUser( id: string ): Promise<ReturnUserDto | { msg: string }> {
  
    if ( ! id ) return { msg: 'Id is mandatory.' };
  
    const findedUser = await this.userModel.findById( id );
    if ( ! findedUser ) return { msg: 'User not exists.' }
  
    return {
      id: findedUser._id,
      name: findedUser.name,
      email: findedUser.email,
      role: findedUser.role,
      ownedRooms: findedUser.ownedRooms,
      participantRooms: findedUser.participantRooms,
      profilePicture: findedUser.profilePicture,
    };
  }

  async createUser( { name, email, password, role }: CreateUserDto, file: Express.Multer.File ): Promise<ReturnUserDto | { msg: string }> {
    
    try {
      const user = await this.userModel.findOne({ email: email });
      if (user) return { msg: 'User already exist.' };

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const createdUser = await this.userModel.create({ name, email, password: hash, role });

      console.log(createdUser.profilePicture)

      const newUser = {
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        role: createdUser.role,
        ownedRooms: createdUser.ownedRooms,
        participantRooms: createdUser.participantRooms,
        profilePicture: createdUser.profilePicture,
      };

      if ( ! file ) return newUser;

      return new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" },
          function (error, result) {

            if (error) reject(error);

            createdUser.profilePicture = result.secure_url;
            createdUser.save();

            const curatedUser = {
              id: createdUser._id,
              name: createdUser.name,
              email: createdUser.email,
              role: createdUser.role,
              ownedRooms: createdUser.ownedRooms,
              participantRooms: createdUser.participantRooms,
              profilePicture: createdUser.profilePicture,
            };

            resolve(curatedUser);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
      });

    } catch (error) {
      throw error;
    }

  }

  async addProfilePicture( { userId }: { userId: string }, file: Express.Multer.File, authenticatedUser ): Promise<ReturnUserDto | { msg: string }> {

    try {
      const user = await this.userModel.findById( userId );
      if ( ! user ) return { msg: 'User not exist.' };

      if ( userId !== authenticatedUser.userId ) return { msg: 'You don\'t have the rights to do this action.' };

      return new Promise(( resolve, reject ) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" },
          function (error, result) {

            if (error) reject({ msg: 'Error uploading image.' });

            user.profilePicture = result.secure_url;
            user.save();

            const curatedUser = {
              id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              ownedRooms: user.ownedRooms,
              participantRooms: user.participantRooms,
              profilePicture: user.profilePicture,
            }

            resolve(curatedUser);
          }
        );
        streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
      })

    } catch (error) {
      throw error;
    }

  }

  async editUser( { id, name, email, role}: EditUserDto, authenticatedUser ): Promise<ReturnUserDto | { msg: string }> {

    try {
      
      const user = await this.userModel.findById( id );
      if ( ! user ) return { msg: 'User not exist.' };

      /**
       * Check if the @body ID match the @req (authenticatedUser) userId from the authenticated user from passport JWT
       */
      if ( id !== authenticatedUser.userId ) return { msg: 'You don\'t have the rights to do this action.' };

      await this.userModel.updateOne({ _id: id }, { name, email, role });
      const editedUser = await this.userModel.findById( id );

      return {
        id: editedUser._id,
        name: editedUser.name,
        email: editedUser.email,
        role: editedUser.role,
        ownedRooms: editedUser.ownedRooms,
        participantRooms: editedUser.participantRooms,
        profilePicture: editedUser.profilePicture,
      }
      
    } catch ( error ) {
      throw error;
    }
  }

  async deleteUser( id: string, authenticatedUser ): Promise<{ msg: string }> {

    try {

      /**
       * Check if the @body ID match the @req (authenticatedUser) userId from the authenticated user from passport JWT
       */
      if ( id !== authenticatedUser.userId ) return { msg: 'You don\'t have the authorization to do this action.' }

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

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        ownedRooms: user.ownedRooms,
        participantRooms: user.participantRooms,
        profilePicture: user.profilePicture,
      };

    } catch ( error ) {
      throw error;
    }
  }


  async validateUser( user ) {

    try {

      const findById = await this.userModel.findById( user.userId );
      if ( ! findById ) return { msg: 'Invalid user', validToken: false };

      const findByEmail = await this.userModel.findOne({ email: user.email });
      if ( ! findByEmail ) return { msg: 'Invalid user', validToken: false };

      return { msg: 'Token authenticated', validToken: true, user: findById };

    } catch (error) {
      throw error;
    }
  }

}
