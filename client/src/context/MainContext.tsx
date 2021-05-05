import axios from 'axios';
import React, { createContext, useReducer } from 'react';
import { API } from '../config/environment/constants';
import InitialState, { User, LoginData, RegisterData } from '../types/user';
import userReducer from './reducers/UserReducer';

const initialState: InitialState = {
  user: null,
  token: null,
  userDidRegister: false,
}

interface ContextProps {
  user: User | null;
  token: string | null;
  signIn: ( loginData: LoginData ) => void;
  singUp: ( registerData: RegisterData ) => void;
  userDidRegister: boolean;
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

  const singUp = ({ name, email, password, role = '' }: RegisterData) => {
    console.log(name, email, password, role)
    axios.post(`${ API }/users`, {
        name,
        email,
        password,
        role,
      })
      .then(response => {
        console.log(response)
        dispatch({ type: 'SIGN_UP' })
      })
      .catch(error => {
        console.log(error);
      })
  }

  return (
    <Context.Provider value={{
      user: state.user,
      token: state.token,
      userDidRegister: state.userDidRegister,
      signIn,
      singUp,
    }}>
    {children}
    </Context.Provider>
  )
}

export default AppContext;