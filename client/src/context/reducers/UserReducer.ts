import InitialState, { User } from "../../types/user";

type TypeAction = { type: 'SIGN_IN', payload: { token: string, user: User } } 
                | { type: 'SIGN_UP' }
                | { type: 'LOGOUT' }
                | { type: 'VALIDATION_COMPLETED' }

const userReducer = ( state: InitialState, action: TypeAction) => {
  
  switch(action.type) {

    case 'SIGN_IN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user
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
        userDidRegister: false
      }

    case 'VALIDATION_COMPLETED':
      return {
        ...state,
        validationCompleted: true,
      }

    default:
      return state;
  }
}

export default userReducer;