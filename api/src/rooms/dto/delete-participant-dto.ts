import { IsNotEmpty, IsString } from "class-validator";

export class DeleteParticipantDto {

  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  participantToDelete: string;

}