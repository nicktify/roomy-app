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
import { ChangePasswordDto } from './dto/change-password.dto';
import { PostDocument } from 'src/posts/schemas/post.schema';
import { ChangeSocialMediaLinkDto } from './dto/change-social-media-link.dto';
import { DeleteSocialMediaLinkDto } from './dto/delete-social-media-link.dto';
import { ChangeAboutDto } from './dto/change-about.tdo';
import { UserIdDto } from './dto/user-id.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>, @InjectModel('Post') private postModel: Model<PostDocument>) {}

    async getUsers(): Promise<ReturnUserDto[]> {

    const users = await this.userModel.find();

    return users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      about: user.about,
      ownedRooms: user.ownedRooms,
      participantRooms: user.participantRooms,
      profilePicture: user.profilePicture,
      profileBackground: user.profileBackground,
      socialMediaLinks: user.socialMediaLinks,
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
      about: findedUser.about,
      ownedRooms: findedUser.ownedRooms,
      participantRooms: findedUser.participantRooms,
      profilePicture: findedUser.profilePicture,
      profileBackground: findedUser.profileBackground,
      socialMediaLinks: findedUser.socialMediaLinks,
    };
  }

  async createUser( { name, email, password }: CreateUserDto, file: Express.Multer.File ): Promise<{ msg: string }> {
    
    try {
      const user = await this.userModel.findOne({ email: email.toLocaleLowerCase() });
      if (user) return { msg: 'Email already registered, try another or log in.' };

      const rounds = 10;
      const hash = await bcrypt.hash(password, rounds);
      const createdUser = await this.userModel.create({ name, email: email.toLocaleLowerCase(), password: hash, about: '' });

      if ( ! file ) return { msg: 'User register success.'};

      return new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" },
          function (error, result) {

            if (error) reject(error);

            createdUser.profilePicture = result.secure_url;
            createdUser.save();

            resolve({ msg: 'User register success.'});
          }
        );
        streamifier.createReadStream(file.buffer).pipe(cld_upload_stream);
      });

    } catch (error) {
      throw error;
    }

  }

  async changePassword({ newPassword, oldPassword, userId }: ChangePasswordDto, user): Promise<{msg: string}> {
    try {
      
      const user = await this.userModel.findById( userId );
      if ( ! user ) return {msg: 'User not exist.'};

      const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);
      if (! isCorrectPassword ) return { msg: 'Authentication failed.' }

      const rounds = 10;
      const newHashedPassword = await bcrypt.hash(newPassword, rounds);

      user.password = newHashedPassword;
      user.save()
      
      return { msg: 'Password changed.' };

    } catch (error) {
      throw error;
    }
  }

  async addProfilePicture( { userId }: { userId: string }, file: Express.Multer.File, authenticatedUser ): Promise<ReturnUserDto | { msg: string }> {

    try {
      const user = await this.userModel.findById( userId );
      if ( ! user ) return { msg: 'User not exist.' };

      if ( userId !== authenticatedUser.userId ) return { msg: 'You don\'t have the rights to do this action.' };

      if ( ! file ) return { msg: 'Image is required.' };

      const userPosts = await this.postModel.find({ authorId: userId });

      return new Promise(( resolve, reject ) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" },
          function (error, result) {

            if (error) reject({ msg: 'Error uploading image.' });

            user.profilePicture = result.secure_url;
            user.save();

            for (let i = 0; i < userPosts.length; i ++) {
              let post = userPosts[i];
              post.authorProfilePicture = result.secure_url;
              post.save();
            }

            const curatedUser = {
              id: user._id,
              name: user.name,
              email: user.email,
              about: user.about,
              ownedRooms: user.ownedRooms,
              participantRooms: user.participantRooms,
              profilePicture: user.profilePicture,
              profileBackground: user.profileBackground,
              socialMediaLinks: user.socialMediaLinks,
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
        about: editedUser.about,
        ownedRooms: editedUser.ownedRooms,
        participantRooms: editedUser.participantRooms,
        profilePicture: editedUser.profilePicture,
        profileBackground: editedUser.profileBackground,
        socialMediaLinks: editedUser.socialMediaLinks,
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

  async getByEmail( { email }: FindByEmailDto ): Promise<ReturnUserDto | {msg: string}>  {

    try {

      const user = await this.userModel.findOne({email: email.toLocaleLowerCase()});
      if ( !user ) return { msg: 'User not exist.' };

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
        ownedRooms: user.ownedRooms,
        participantRooms: user.participantRooms,
        profilePicture: user.profilePicture,
        profileBackground: user.profileBackground,
        socialMediaLinks: user.socialMediaLinks,
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

  async changeProfileBackground( { userId }, file: Express.Multer.File): Promise<ReturnUserDto | {msg: string}> {
    try {

      const user = await this.userModel.findById( userId );
      if (!user) return { msg: 'User not exist' };

      return new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream({ folder: "foo" },
          function (error, result) {

            if (error) reject({ msg: 'Error uploading image.' });

            user.profileBackground = result.secure_url;
            user.save();

            const curatedUser = {
              id: user._id,
              name: user.name,
              email: user.email,
              about: user.about,
              ownedRooms: user.ownedRooms,
              participantRooms: user.participantRooms,
              profilePicture: user.profilePicture,
              profileBackground: user.profileBackground,
              socialMediaLinks: user.socialMediaLinks
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

  async changeSocialMediaLink({ userId, type, link }: ChangeSocialMediaLinkDto): Promise<ReturnUserDto | {msg: string}> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) return {msg: 'User not exist'};

      if (type === 'facebook') {
        user.socialMediaLinks = {facebook: link, 
            twitter: user.socialMediaLinks.twitter,
            instagram: user.socialMediaLinks.instagram
          };
      }

      if (type === 'twitter') {
        user.socialMediaLinks = {
          facebook: user.socialMediaLinks.facebook,
          twitter: link,
          instagram: user.socialMediaLinks.instagram};
      }

      if (type === 'instagram') {
        user.socialMediaLinks = {
          facebook: user.socialMediaLinks.facebook,
          twitter: user.socialMediaLinks.twitter,
          instagram: link};
      }

      user.save();

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
        ownedRooms: user.ownedRooms,
        participantRooms: user.participantRooms,
        profilePicture: user.profilePicture,
        profileBackground: user.profileBackground,
        socialMediaLinks: user.socialMediaLinks
      }
      
    } catch (error) {
      throw error;
    }
  }

  async deleteSocialMediaLink({ userId, type }: DeleteSocialMediaLinkDto): Promise<ReturnUserDto | {msg: string}> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) return {msg: 'User not exist'};

      if (type === 'facebook') {
        user.socialMediaLinks = {
          facebook: null, 
          twitter: user.socialMediaLinks.twitter,
          instagram: user.socialMediaLinks.instagram
        };
      }

      if (type === 'twitter') {
        user.socialMediaLinks = {
          facebook: user.socialMediaLinks.facebook,
          twitter: null,
          instagram: user.socialMediaLinks.instagram
        };
      }

      if (type === 'instagram') {
        user.socialMediaLinks = {
          facebook: user.socialMediaLinks.facebook,
          twitter: user.socialMediaLinks.twitter,
          instagram: null
        };
      }

      user.save();

      return {
        id: user._id,
        name: user.name,
        email: user.email,
        about: user.about,
        ownedRooms: user.ownedRooms,
        participantRooms: user.participantRooms,
        profilePicture: user.profilePicture,
        profileBackground: user.profileBackground,
        socialMediaLinks: user.socialMediaLinks
      }
      
    } catch (error) {
      throw error;
    }
  }

  async changeAbout( { userId, about }:ChangeAboutDto ): Promise<{msg: string}> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) return {msg: 'User not exist.'}

      user.about = about;
      user.save();

      return {msg: 'About changed.'}

    } catch (error) {
      throw error;
    }
  }

  async clearAbout({ userId }: UserIdDto ): Promise<{msg: string}> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user) return {msg: 'User not exist.'}

      user.about = '';

      user.save();

      return {msg: 'About cleaned'};

    } catch (error) {
      throw error;
    }
  }

}
