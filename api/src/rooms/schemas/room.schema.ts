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

  @Prop()
  links: [
    {
      name: string;
      link: string;
    }
  ]

  @Prop()
  news: string;

  @Prop()
  posts: [
    {
      body: string;
      date: Date;
    }
  ]

}

export const RoomSchema = SchemaFactory.createForClass(Room);
