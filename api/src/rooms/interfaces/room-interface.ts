import { User } from "src/users/interfaces/user.interface";

export interface Room {
  name: string;
  password: string;
  participants: User[]
}
