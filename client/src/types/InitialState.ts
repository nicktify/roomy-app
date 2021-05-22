import { ForumPost } from "./ForumPost";
import { Post } from "./Post";
import { Room } from "./Room";
import { User } from "./user";

export class InitialState {
  user: User | null;
  token: string | null;
  userDidRegister: boolean;
  validationCompleted: boolean;
  rooms: Room[] | null;
  selectedRoom: Room | null;
  selectedRoomPosts: Post[] | null;
  selectedRoomUsers: User[] | null;
  selectedRoomForumPosts: ForumPost[] | null;
  searchedUser: User | null;
}