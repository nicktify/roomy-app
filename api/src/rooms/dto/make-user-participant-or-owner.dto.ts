import { IsNotEmpty, IsString } from "class-validator";

export class MakeUserParticipantOrOwnerDto {
  @IsNotEmpty()
  @IsString()
  userId: string

  @IsNotEmpty()
  @IsString()
  roomId: string
}