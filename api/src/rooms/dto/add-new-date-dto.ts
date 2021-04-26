import { IsDate, IsNotEmpty, IsString } from "class-validator";

export class AddNewDateDto {

  @IsNotEmpty()
  @IsString()
  id: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;
  
}