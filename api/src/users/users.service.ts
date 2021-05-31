require('dotenv').config()
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { v2 as cloudinary } from 'cloudinary';
// let cloudinary = require("cloudinary").v2;
let streamifier = require('streamifier');
let nodemailer = require('nodemailer');

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
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

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

      if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
        return { msg: 'Password should have at least one lowercase, one uppercase, and one number.' }
      }

      const rounds = 10;
      const hash = await bcrypt.hash(password, rounds);

      const passFirstPart = Math.random().toString(36).slice(-8).replace('.', '').replace('/', '')
      const passSecondPart = Math.random().toString(36).slice(-8).replace('.', '').replace('/', '')
      const passThirdPart = Math.random().toString(36).slice(-8).replace('.', '').replace('/', '')

      const createdUser = await this.userModel.create({ 
        name,
        email: email.toLocaleLowerCase(),
        password: hash,
        temporalEmailConfirmationPassword: `${passFirstPart}${passSecondPart}${passThirdPart}`,
        about: '',
      });

      const transporter = nodemailer.createTransport({
        service: "gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      var message = {
        from: 'Roomy',
        to: process.env.EMAIL_TEST,
        subject: "Confirm email - Roomy",
        html: `
          <div>
            <h1>Confirm your email by clicking the following link</h1>
            <a
              href="https://roomy-app-api.herokuapp.com/users/email-confirmation/${createdUser._id}/special-info/${createdUser.temporalEmailConfirmationPassword}"
            >
              Reset password
            </a>
          </div>
        `
      };

      if ( ! file) {
        return new Promise((resolve, reject) => {
          transporter.sendMail(message, (err, info) => {
            if (!err) {
              resolve({msg: 'Register success. Please confirm your email.'})
            } else {
              reject(err)
            }
          });
        })
      };

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

  async emailConfirmation({ userId, emailConfirmationPassword }): Promise<any> {
    try {
      const user = await this.userModel.findById(userId)
      if (!user) return {msg: 'Inexistent user.'}
      if (emailConfirmationPassword !== user.temporalEmailConfirmationPassword) {
        return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Roomy app</title>
            <link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
            <style>
              .container {
                display: flex;
                justify-content: center;
                width: 100%;
                height: 100vh;
                align-items: center;
                background-color: #69C1AC;
              }
              .title {
                font-weight: bold;
                font-size: 60px;
                color: white;
                background-color: black;
                font-family: 'Roboto', sans-serif;
                line-height: 100px
              }
            </style>
          </head>
          <body>
            <div class='container'>
              <div>
                <h1 class='title'>Something went wrong. Cannot confirm the email.</h1>
                <h1 class='title'>Please try again.</h1>
              </div>
            </div>
          </body>
          </html>
        `
      }

      user.emailConfirmation = true;
      user.save();

      return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Roomy app</title>
          <link rel="preconnect" href="https://fonts.gstatic.com">
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap" rel="stylesheet">
          <style>
            .container {
              display: flex;
              justify-content: center;
              width: 100%;
              height: 100vh;
              align-items: center;
              background-color: #69C1AC;
            }
            .title {
              font-weight: bold;
              font-size: 60px;
              color: white;
              background-color: black;
              font-family: 'Roboto', sans-serif;
              line-height: 100px
            }
          </style>
        </head>
        <body>
          <div class='container'>
            <div>
              <h1 class='title'>Email confirmed. Now you can use Roomy app.</h1>
              <h1 class='title'>Thank you for your trust in our services.</h1>
            </div>
          </div>
        </body>
        </html>
      `

    } catch (error) {
      throw error;
    }
  }

  async changePassword({ newPassword, oldPassword, userId }: ChangePasswordDto): Promise<{msg: string}> {
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

  async resetPassword({newPassword, userId, token}: ResetPasswordDto): Promise<any> {
    try {
      const user = await this.userModel.findById(userId)
      if (!user) return 'Inexistent user.'

      if (!/[a-z]/.test(newPassword) || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
        return 'Password should have at least one lowercase, one uppercase, and one number.'
      }

      if (user.changePasswordInfo.token !== token) {
        return 'Invalid authentication.'
      }

      const today = new Date();
      const expiration = new Date(user.changePasswordInfo.date);
      if (expiration < today) {
        return 'The link you have followed has expired.'
      }

      const rounds = 10;
      const hash = await bcrypt.hash(newPassword, rounds);
      user.password = hash;
      user.changePasswordInfo.token = uuidv4();
      user.save();

      return 'Password changed successfuly.'
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
        user.socialMediaLinks = {
          ...user.socialMediaLinks,
          facebook: link,
        };
      }

      if (type === 'twitter') {
        user.socialMediaLinks = {
          ...user.socialMediaLinks,
          twitter: link,
        };
      }

      if (type === 'instagram') {
        user.socialMediaLinks = {
          ...user.socialMediaLinks,
          instagram: link,
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

  async forgotPassword({email}: ForgotPasswordDto): Promise<any> {
    try {
      const user = await this.userModel.findOne({email});
      if (!user) return 'Inexistent email.'

      let date = new Date();
      date.setDate(date.getDate() + 1);

      user.changePasswordInfo = {
        token: uuidv4(),
        date,
      };
      user.save()

      const transporter = nodemailer.createTransport({
        service: "gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      var message = {
        from: 'Roomy',
        to: process.env.EMAIL_TEST,
        subject: "Reset password - Roomy",
        html: `
          <div>
            <h1>Hello ${user.name}</h1>
            <h1>Go to the following link to reset your password</h1>
            <a
              href="https://roomy-app.netlify.app/reset-password/${user.id}/validation/${user.changePasswordInfo.token}"
            >Reset password</a>
          </div>
        `
      };

      return new Promise((resolve, reject) => {
        transporter.sendMail(message, (err, info) => {
          if (!err) {
            resolve('Email sent.')
          } else {
            reject(err)
          }
        });
      })

    } catch (error) {
      throw error;
    }
  }

}
