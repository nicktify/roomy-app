import { IsNotEmpty, IsString } from "class-validator";

export class DeleteOwnerDto {

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  ownerToDelete: string;
  
}