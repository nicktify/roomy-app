import { IsArray, IsDataURI, IsDate, IsNotEmpty, IsObject, IsString } from "class-validator";

export class ReturnForumPostDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsNotEmpty()
  @IsString()
  authorProfilePicture: string;

  @IsNotEmpty()
  @IsString()
  authorName: string;

  @IsNotEmpty()
  @IsString()
  body: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsObject()
  latestComment: {
    authorId: string,
    authorProfilePicture: string,
    body: string,
  }
}