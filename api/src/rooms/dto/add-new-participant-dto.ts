import { IsNotEmpty, IsString } from "class-validator";

export class addNewParticipantDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  newParticipant: string;

}