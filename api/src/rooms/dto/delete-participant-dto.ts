import { IsNotEmpty, IsString } from "class-validator";

export class DeleteParticipantDto {

  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  owner: string;

  @IsString()
  @IsNotEmpty()
  participantToDelete: string;

}