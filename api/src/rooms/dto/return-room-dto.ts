import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class ReturnRoomDto {

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  owners: string[];

  @IsNotEmpty()
  @IsArray()
  participants: string[];
  
};