import { IsNotEmpty, IsString } from "class-validator";

export class GetAllForumPostCommentsDto {
  @IsNotEmpty()
  @IsString()
  forumPostId: string;
}