import axios from 'axios';
import React, { createContext, useReducer } from 'react';
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
  resolveValidation: () => void;
}

export const Context = createContext({} as ContextProps);

const AppContext = ({ children }: any) => {

  const [ state, dispatch ] = useReducer(userReducer, initialState);

  const signIn = ({ email, password }: LoginData ) => {
    axios.post(`${ API }/users/auth/login`, {
        email,
        password
      })
      .then( async response => {
        try {
          await AsyncStorage.setItem('token', JSON.stringify(response.data.access_token));
          dispatch({ type: 'SIGN_IN', payload: { token: response.data.access_token, user: response.data.user } });
        } catch (error) {
          console.log(error);
        }
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

  const validateToken = async (token: string) => {
    axios.post(`${ API }/users/auth/validate-token`,
        undefined,
        {headers: { Authorization: `Bearer ${token}` }}
      )
      .then(response => {
        console.log(response.data)
        if (response.data.validToken) {
          return dispatch({ type: 'SIGN_USER_ON_VALIDATION', payload: { token, user: response.data.user } });
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const resolveValidation = () => {
    dispatch({ type: 'VALIDATION_COMPLETED' })
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
      resolveValidation
    }}>
    {children}
    </Context.Provider>
  )
}

export default AppContext;