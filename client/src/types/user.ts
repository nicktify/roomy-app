import { ForumPost } from "./ForumPost";
import { Post } from "./Post";
import { Room } from "./Room";

export class User {
  email: string;
  id: string;
  name: string;
  ownedRooms: [string];
  participantRooms: [string];
  about: string;
  profilePicture: string | null;
  profileBackground: string | null;
  socialMediaLinks: {
    facebook: string | null,
    instagram: string | null,
    twitter: string | null,
  }
}

class InitialState {
  user: User | null;
  token: string | null;
  userDidRegister: boolean;
  validationCompleted: boolean;
  rooms: Room[] | null;
  selectedRoom: Room | null;
  selectedRoomPosts: Post[] | null;
  selectedRoomUsers: User[] | null;
  selectedRoomForumPosts: ForumPost[] | null;
}

export class LoginData {
  email: string;
  password: string;
}

export class RegisterData {
  email: string;
  name: string;
  password: string;
}

export default InitialState;