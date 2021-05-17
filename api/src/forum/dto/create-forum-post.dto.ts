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

  @IsNotEmpty()
  @IsString()
  authorProfilePicture: string;

  @IsNotEmpty()
  @IsObject()
  image: {
    url: string,
    size: { width: number, height: number }
  };
}