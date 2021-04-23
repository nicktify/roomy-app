export class ReturnUserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  ownedRooms: string[];
  participantRooms: string[];
}