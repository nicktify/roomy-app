import { User } from "src/users/interfaces/user.interface";

export class CreateRoomDto {
  name: string;
  owner: User;
  password: string;
}
