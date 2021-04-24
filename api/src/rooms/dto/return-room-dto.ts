import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class ReturnRoomDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsNotEmpty()
  owners: string[];

  @IsArray()
  @IsNotEmpty()
  participants: string[];
  
};