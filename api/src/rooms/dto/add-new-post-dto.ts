import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class AddNewPostDto {

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  authorId: string;

  @IsNotEmpty()
  @IsString()
  body: string;

}