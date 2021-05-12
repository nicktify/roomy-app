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
  password: string;

  @Prop()
  role: string;

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

}

export const UserSchema = SchemaFactory.createForClass( User );
