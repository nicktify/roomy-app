import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ReturnUserDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsArray()
  @IsNotEmpty()
  ownedRooms: string[];

  @IsArray()
  @IsNotEmpty()
  participantRooms: string[];
}