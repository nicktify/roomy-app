import { IsNotEmpty, IsString } from "class-validator";

export class ChangeSocialMediaLinkDto {

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  link: string;

}