import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/interfaces/user.interface';

export type RoomDocument = Room & Document;

@Schema()
export class Room {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  participants: User[]

}

export const RoomSchema = SchemaFactory.createForClass(Room);
