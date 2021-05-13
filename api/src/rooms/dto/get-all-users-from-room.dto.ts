import { IsNotEmpty, IsString } from "class-validator";

export class GetAllUsersFromRoomDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;
}