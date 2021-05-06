import axios from 'axios';
import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API } from '../config/environment/constants';
import InitialState, { User, LoginData, RegisterData } from '../types/user';
import userReducer from './reducers/UserReducer';

const initialState: InitialState = {
  user: null,
  token: null,
  userDidRegister: false,
  validationCompleted: false
}

interface ContextProps {
  user: User | null;
  token: string | null;
  signIn: ( loginData: LoginData ) => void;
  singUp: ( registerData: RegisterData ) => void;
  userDidRegister: boolean;
  validationCompleted: boolean;
  validateToken: (token: string) => Promise<void>;
  logout: () => void;
}

export const Context = createContext({} as ContextProps);

const AppContext = ({ children }: any) => {

  const [ state, dispatch ] = useReducer(userReducer, initialState);

  useEffect(() => {
    validateToken();
  }, [])

  const signIn = ({ email, password }: LoginData ) => {
    axios.post(`${ API }/users/auth/login`, {
        email,
        password
      })
      .then( async response => {
        await AsyncStorage.setItem('token', JSON.stringify(response.data.access_token));
        dispatch({ type: 'SIGN_IN', payload: { token: response.data.access_token, user: response.data.user } });
      })
      .catch(error => {
        console.log( error );
      })
  }

  const singUp = ({ name, email, password, role = '' }: RegisterData) => {
    axios.post(`${ API }/users`, {
        name,
        email,
        password,
        role,
      })
      .then(response => {
        dispatch({ type: 'SIGN_UP' })
      })
      .catch(error => {
        console.log(error);
      })
  }

  const validateToken = async () => {

    const token = await AsyncStorage.getItem('token');
    
    if ( ! token ) {
      dispatch({ type: 'VALIDATION_COMPLETED' });
      return;
    }

    axios.post(`${ API }/users/auth/validate-token`,
        undefined,
        {headers: { Authorization: `Bearer ${JSON.parse(token)}` }}
      )
      .then(response => {
        dispatch({ type: 'SIGN_IN', payload: { token: response.data.access_token, user: response.data.user } });
        dispatch({ type: 'VALIDATION_COMPLETED' });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: 'VALIDATION_COMPLETED' });
      })
  }

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Context.Provider value={{
      user: state.user,
      token: state.token,
      userDidRegister: state.userDidRegister,
      validationCompleted: state.validationCompleted,
      signIn,
      singUp,
      validateToken,
      logout
    }}>
    {children}
    </Context.Provider>
  )
}

export default AppContext;