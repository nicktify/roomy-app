import { IsNotEmpty, IsString } from "class-validator";

export class AddNewOwnerDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  newOwner: string;
}