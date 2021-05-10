import { IsNotEmpty, IsString } from "class-validator";

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}