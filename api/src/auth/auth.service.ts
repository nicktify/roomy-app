import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

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
      role: user.role,
      ownedRooms: user.ownedRooms,
      participantRooms: user.participantRooms
    }

    return curatedUser;

  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

}
