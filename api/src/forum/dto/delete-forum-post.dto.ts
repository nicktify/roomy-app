import { IsNotEmpty, IsString } from "class-validator";

export class DeleteForumPostDto {
  @IsNotEmpty()
  @IsString()
  forumPostId: string;
}