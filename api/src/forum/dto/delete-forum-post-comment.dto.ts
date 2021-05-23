import { IsNotEmpty, IsString } from "class-validator";

export class DeleteForumPostCommentDto {
  @IsNotEmpty()
  @IsString()
  forumPostCommentId: string;

  @IsNotEmpty()
  @IsString()
  forumPostId: string;
}