export class CreateRoomDto {
  name: string;
  password: string;
  owners: string[];
  participants: string[]
}
