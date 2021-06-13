import { IsNotEmpty, IsString } from "class-validator";

export class RenameRoomDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  newName: string;
}