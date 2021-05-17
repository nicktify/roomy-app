import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostForumDocument = PostForum & Document;

@Schema()
export class PostForum {
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

  @Prop({ type: Array })
  comments: [{
    authorId: string,
    authorProfilePicture: string,
    body: string,
  }];
}

export const PostForumSchema = SchemaFactory.createForClass( PostForum );