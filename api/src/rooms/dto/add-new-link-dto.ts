import { IsNotEmpty, IsString } from "class-validator";

export class AddNewLinkDto {

  @IsNotEmpty()
  @IsString()
  id: string

  @IsNotEmpty()
  @IsString()
  ownerId: string;

  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsString()
  link: string

}