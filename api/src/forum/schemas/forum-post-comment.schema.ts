import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ForumPostCommentDocument = ForumPostComment & Document;

@Schema()
export class ForumPostComment {
  @Prop()
  forumPostId: string;

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
}

export const ForumPostCommentSchema = SchemaFactory.createForClass( ForumPostComment );