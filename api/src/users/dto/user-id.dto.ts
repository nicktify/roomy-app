import { IsNotEmpty, IsString } from "class-validator";

export class UserIdDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
}