import { IsNotEmpty, IsString } from "class-validator";

export class ChangeAboutDto {
  @IsNotEmpty()
  @IsString()
  about: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}