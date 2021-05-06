import { Room } from "./Room";

export class User {
  email: string;
  id: string;
  name: string;
  ownedRooms: [string];
  participantRooms: [string];
  role: string;
}

class InitialState {
  user: User | null;
  token: string | null;
  userDidRegister: boolean;
  validationCompleted: boolean;
  ownedRooms: Room[] | null;
  participantRooms: Room[] | null;
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