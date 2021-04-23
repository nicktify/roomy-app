import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {

  @Prop()
  name: string;

  @Prop()
  owners: string[];

  @Prop()
  password: string;

  @Prop()
  participants: string[];

}

export const RoomSchema = SchemaFactory.createForClass(Room);
