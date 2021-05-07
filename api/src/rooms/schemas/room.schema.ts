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
  dates: [
    {
      date: Date;
      name: string;
      description: string;
    }
  ]

  @Prop()
  posts: [
    {
      authorId: string;
      body: string;
      date: Date;
    }
  ]

  @Prop()
  books: [
    {
      name: string;
      description: string;
      link: string;
    }
  ]

}

export const RoomSchema = SchemaFactory.createForClass( Room );
