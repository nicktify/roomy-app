import { IsNotEmpty, IsString } from "class-validator";

export class AddForumPostCommentDto {
  @IsNotEmpty()
  @IsString()
  forumPostId: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;
}