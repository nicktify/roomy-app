export interface User {
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: string;
  readonly ownedRooms: string[];
  readonly participantRooms: string[];
}
