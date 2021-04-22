import { IsNotEmpty } from "class-validator";
import { CreateUserDto } from "./create-user.dto";

export class EditUserDto extends CreateUserDto {

  @IsNotEmpty()
  id: string;

}