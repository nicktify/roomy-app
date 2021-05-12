import { IsNotEmpty, IsString } from "class-validator";

export class DeleteSocialMediaLinkDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  type: string;
}