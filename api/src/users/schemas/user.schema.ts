import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  emailConfirmation: boolean;

  @Prop()
  temporalEmailConfirmationPassword: string;

  @Prop()
  password: string;

  @Prop()
  about: string;

  @Prop()
  ownedRooms: string[];

  @Prop()
  participantRooms: string[];

  @Prop()
  profilePicture: string;

  @Prop()
  profileBackground: string;

  @Prop({ type: Object })
  socialMediaLinks: {
    facebook: string,
    instagram: string,
    twitter: string,
  }

  @Prop({type: Object})
  changePasswordInfo: {
    token: string,
    date: Date,
  };

}

export const UserSchema = SchemaFactory.createForClass( User );
