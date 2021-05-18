import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class ReturnForumPostCommentDto {
  @IsNotEmpty()
  @IsString()
  forumPostId: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsNotEmpty()
  @IsString()
  authorName: string;

  @IsNotEmpty()
  @IsString()
  authorProfilePicture: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;
}