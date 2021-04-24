import { IsNotEmpty, IsString } from "class-validator";

export class DeleteOwnerDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  ownerToDelete: string;
}