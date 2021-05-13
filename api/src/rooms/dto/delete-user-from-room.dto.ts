import { IsNotEmpty, IsString } from "class-validator";

export class DeleteUserFromRoomDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}