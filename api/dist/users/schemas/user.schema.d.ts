import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    name: string;
    email: string;
    emailConfirmation: boolean;
    temporalEmailConfirmationPassword: string;
    password: string;
    about: string;
    ownedRooms: string[];
    participantRooms: string[];
    profilePicture: string;
    profileBackground: string;
    socialMediaLinks: {
        facebook: string;
        instagram: string;
        twitter: string;
    };
}
export declare const UserSchema: import("mongoose").Schema<Document<User, {}>, import("mongoose").Model<any, any>, undefined>;
