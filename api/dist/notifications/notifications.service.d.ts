import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
export declare class NotificationsService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
}
