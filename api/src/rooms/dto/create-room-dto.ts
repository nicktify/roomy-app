import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoomDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

}
