import { Room } from "src/rooms/interfaces/room-interface";

export class ReturnUserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  rooms: Room[];
}