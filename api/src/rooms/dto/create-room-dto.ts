import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

}
