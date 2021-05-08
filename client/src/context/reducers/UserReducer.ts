import { AxiosResponse } from "axios";
import { Room } from "../../types/Room";
import InitialState, { User } from "../../types/user";

type TypeAction = { type: 'SIGN_IN', payload: { token: string, user: User } } 
                | { type: 'SIGN_UP' }
                | { type: 'LOGOUT' }
                | { type: 'VALIDATION_COMPLETED' }
                | { type: 'SET_ROOMS', payload: { participantRooms: Room[], ownedRooms: Room[] } }
                | { type: 'SET_SELECTED_ROOM', payload: Room }

const userReducer = ( state: InitialState, action: TypeAction) => {
  
  switch(action.type) {

    case 'SIGN_IN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      }

    case 'SIGN_UP':
      return {
        ...state,
        token: null,
        user: null,
        userDidRegister: true,
      }

    case 'LOGOUT':
      return {
        ...state,
        token: null,
        user: null,
        userDidRegister: false,
      }

    case 'VALIDATION_COMPLETED':
      return {
        ...state,
        validationCompleted: true,
      }

    case 'SET_ROOMS':
      return {
        ...state,
        participantRooms: action.payload.participantRooms,
        ownedRooms: action.payload.ownedRooms,
      }

    case 'SET_SELECTED_ROOM':
      return {
        ...state,
        selectedRoom: action.payload,
      }

    default:
      return state;
  }
}

export default userReducer;