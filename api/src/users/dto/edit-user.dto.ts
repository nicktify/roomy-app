import { IsNotEmpty, IsString } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class EditUserDto extends CreateUserDto {

  @IsNotEmpty()
  @IsString()
  id: string;

}