import { IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class ReturnUserDto {

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsArray()
  ownedRooms: string[];

  @IsNotEmpty()
  @IsArray()
  participantRooms: string[];

  @IsNotEmpty()
  @IsString()
  profilePicture: string;

  @IsNotEmpty()
  @IsString()
  profileBackground: string;
}