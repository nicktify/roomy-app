import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  
}
