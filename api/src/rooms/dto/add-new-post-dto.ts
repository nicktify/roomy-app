import { IsNotEmpty, IsString } from "class-validator";

export class AddNewPostDto {

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  date: string;

}