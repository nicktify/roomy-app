import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsArray()
  @IsNotEmpty()
  owner: string[];

  @IsArray()
  @IsNotEmpty()
  participants: string[]
}
