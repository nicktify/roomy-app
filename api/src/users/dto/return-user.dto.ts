import { IsArray, IsEmail, IsNotEmpty, IsObject, IsString } from "class-validator";

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
  about: string;

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

  @IsNotEmpty()
  @IsObject()
  socialMediaLinks: {
    facebook: string | null,
    instagram: string | null,
    twitter: string | null,
  }

}