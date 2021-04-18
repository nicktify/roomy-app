import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async getUsers(): Promise<User[]> {
    return await this.userModel.find();
  }

  async createUser(user: User): Promise<User> {
    return this.userModel.create(user);
  }
}
