import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class AddNewDateDto {

  @IsString()
  @IsNotEmpty()
  id: string;
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  date: Date;
  
}