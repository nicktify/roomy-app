import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ForumPostDocument = ForumPost & Document;

@Schema()
export class ForumPost {
  @Prop()
  roomId: string;

  @Prop()
  authorId: string;

  @Prop()
  authorProfilePicture: string;

  @Prop()
  authorName: string;

  @Prop()
  body: string;

  @Prop()
  image: string;

  @Prop()
  date: Date;

  @Prop()
  comments: string[];
}

export const ForumPostSchema = SchemaFactory.createForClass( ForumPost );