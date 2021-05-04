export class User {
  email: string;
  id: string;
  name: string;
  ownedRooms: [];
  participantRooms: [];
  role: string;
}

export class InitialState {
  user: User;
}