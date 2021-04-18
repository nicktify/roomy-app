import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {User} from 'src/users/schemas/user.schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  owner: User;

  @Prop({ required: true })
  password: string;

}

export const RoomSchema = SchemaFactory.createForClass(Room);
