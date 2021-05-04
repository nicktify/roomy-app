import { User } from "../../types/user";

type TypeAction = { type: 'SIGN_IN', payload: { token: string, user: User } }

type TypeState = {
  user: User,
  token: string
}

const userReducer = ( state, action: TypeAction) => {
  
  switch(action.type) {

    case 'SIGN_IN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
      }

    default:
      return state;
  }
}

export default userReducer;