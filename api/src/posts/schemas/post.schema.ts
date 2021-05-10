import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {

  @Prop()
  roomId: string;

  @Prop()
  authorId: string;

  @Prop()
  authorProfilePicture: string;

  @Prop()
  authorName: string;

  @Prop()
  body: string

  @Prop()
  date: Date;

  @Prop()
  image: string;

}

export const PostSchema = SchemaFactory.createForClass( Post );