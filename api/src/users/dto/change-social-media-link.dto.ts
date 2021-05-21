import { IsNotEmpty, IsString } from "class-validator";

export class ChangeSocialMediaLinkDto {

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsString()
  link: string;

}