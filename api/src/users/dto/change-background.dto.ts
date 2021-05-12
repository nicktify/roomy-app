import { IsNotEmpty, IsString } from "class-validator";

export class ChangeBackgroundDto {

  @IsNotEmpty()
  @IsString()
  userId: string;
  
}