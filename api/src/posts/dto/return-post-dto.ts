import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class ReturnPostDto {

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
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  image: string;

}