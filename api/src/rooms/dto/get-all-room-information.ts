import { IsNotEmpty, IsString } from "class-validator";

export class GetAllRoomInformation {
  @IsNotEmpty()
  @IsString()
  roomId: string;
}