import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {

  @Prop()
  name: string;
  
  @Prop()
  password: string;
  
  @Prop()
  owners: string[];
  
  @Prop()
  participants: string[];

}

export const RoomSchema = SchemaFactory.createForClass(Room);
