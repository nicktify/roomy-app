import { IsNotEmpty, IsString } from "class-validator";

export class GetAllRoomForumPostDto {
  @IsNotEmpty()
  @IsString()
  roomId: string;
}