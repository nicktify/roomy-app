import { IsNotEmpty, IsString } from "class-validator";

export class AddNewOwnerDto {

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  newOwner: string;
  
}