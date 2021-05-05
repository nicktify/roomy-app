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
  userDidRegister: boolean;
  validationCompleted: boolean;
}

export class LoginData {
  email: string;
  password: string;
}

export class RegisterData {
  email: string;
  name: string;
  password: string;
  role: string;
}

export default InitialState;