import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}