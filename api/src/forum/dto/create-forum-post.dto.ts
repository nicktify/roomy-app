import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateForumPostDto {
  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  body: string;
}