import { IsEmail, IsNotEmpty } from "class-validator";

export class FindByEmailDto {

  @IsEmail()
  @IsNotEmpty()
  email: string;
  
}