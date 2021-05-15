import { IsNotEmpty, IsString } from "class-validator";

export class GetAllRoomsFromUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}