import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from 'src/users/dto/return-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService
    ) {}
  
  async validateUser( { username, password } ): Promise<any> {

    const user = await this.userModel.findOne({ email: username });

    if ( ! user ) return null;

    const result = await bcrypt.compare( password, user.password );

    if ( ! result ) return null;

    const curatedUser = {
      id: user._id,
      name: user.name,
      email: user.email,
      emailConfirmation: user.emailConfirmation,
      about: user.about,
      ownedRooms: user.ownedRooms,
      participantRooms: user.participantRooms,
      profilePicture: user.profilePicture,
      profileBackground: user.profileBackground,
      socialMediaLinks: user.socialMediaLinks,
    }

    return curatedUser;

  }

  async login( user ): Promise<{ access_token: string, user: ReturnUserDto } | {msg: string}> {
    // if (!user.emailConfirmation) return {msg: 'Unverified email.'}
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign( payload ),
      user
    };
  }

  async validateToken( { email, userId }: { email: string, userId: string } ): Promise<{ access_token: string, user: ReturnUserDto } | { msg: string }> {
    
    const user = await this.userModel.findOne({email});

    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign( payload ),
      user: {
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
    }
  }

}
