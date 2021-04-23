import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type RoomDocument = Room & Document;

@Schema()
export class Room {

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  participants: User[]

}

export const RoomSchema = SchemaFactory.createForClass(Room);
