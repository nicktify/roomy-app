import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { API } from '../config/environment/constants';
import InitialState, { User, LoginData } from '../types/user';
import userReducer from './reducers/UserReducer';

const initialState: InitialState = {
  user: null,
  token: null
}

interface ContextProps {
  user: User;
  token: string;
  signIn: ( loginData: LoginData ) => void;
}

export const Context = createContext({} as ContextProps);

const AppContext = ({ children }: any) => {

  const [ state, dispatch ] = useReducer(userReducer, initialState);

  const signIn = ({ email, password }: LoginData ) => {
    axios.post(`${ API }/users/auth/login`, {
        email,
        password
      })
      .then(response => {
        dispatch({ type: 'SIGN_IN', payload: { token: response.data.access_token, user: response.data.user } });
      })
      .catch(error => {
        console.log( error );
      })
  }

  return (
    <Context.Provider value={{
      user: state.user,
      token: state.token,
      signIn,
    }}>
    {children}
    </Context.Provider>
  )
}

export default AppContext;