export class User {
  email: string;
  id: string;
  name: string;
  ownedRooms: [];
  participantRooms: [];
  role: string;
}

class InitialState {
  user: User | null;
  token: string | null;
}

export class LoginData {
  email: string;
  password: string;
}

export default InitialState;