import { IsNotEmpty, IsString } from "class-validator";

export class AddNewBookDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  link: string;

}