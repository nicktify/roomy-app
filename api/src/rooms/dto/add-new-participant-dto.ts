import { IsNotEmpty, IsString } from "class-validator";

export class addNewParticipantDto {

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  newParticipant: string;

}