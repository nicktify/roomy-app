import { ForumPost } from "../../types/ForumPost";
import { Post } from "../../types/Post";
import { Room } from "../../types/Room";
import InitialState, { User } from "../../types/user";

type TypeAction = { type: 'SIGN_IN', payload: { token: string, user: User; }; }
  | { type: 'LOGOUT'; }
  | { type: 'VALIDATION_COMPLETED'; }
  | { type: 'SET_ROOMS', payload: Room[]; }
  | { type: 'SET_SELECTED_ROOM', payload: Room; }
  | { type: 'SET_ROOM_POSTS', payload: Post[]; }
  | { type: 'SET_ROOM_INFORMATION', payload: { posts: Post[], users: User[], forumPosts: ForumPost[] }; }
  | { type: 'SET_ROOM_USERS', payload: User[]; }
  | { type: 'SET_ROOM_FORUM_POSTS', payload: ForumPost[]; }

const userReducer = (state: InitialState, action: TypeAction) => {

  switch (action.type) {

    case 'SIGN_IN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };

    case 'LOGOUT':
      return {
        user: null,
        token: null,
        userDidRegister: false,
        validationCompleted: true,
        rooms: null,
        selectedRoom: null,
        selectedRoomPosts: null,
        selectedRoomUsers: null,
        selectedRoomForumPosts: null,
      };

    case 'VALIDATION_COMPLETED':
      return {
        ...state,
        validationCompleted: true,
      };

    case 'SET_ROOMS':
      return {
        ...state,
        rooms: action.payload
      };

    case 'SET_SELECTED_ROOM':
      return {
        ...state,
        selectedRoom: action.payload,
      };
      
    case 'SET_ROOM_INFORMATION':
      return {
        ...state,
        selectedRoomPosts: action.payload.posts,
        selectedRoomUsers: action.payload.users,
        selectedRoomForumPosts: action.payload.forumPosts,
      };
        
    case 'SET_ROOM_POSTS':
        return {
          ...state,
          selectedRoomPosts: action.payload,
      };
        
    case 'SET_ROOM_USERS':
      return {
        ...state,
        selectedRoomUsers: action.payload,
      };

    case 'SET_ROOM_FORUM_POSTS':
      return {
        ...state,
        selectedRoomForumPosts: action.payload,
      }

    default:
      return state;
  }
};

export default userReducer;