import axios from 'axios';
import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API } from '../config/environment/constants';
import InitialState, { User, LoginData, RegisterData } from '../types/user';
import userReducer from './reducers/UserReducer';
import { Room } from '../types/Room';

const initialState: InitialState = {
  user: null,
  token: null,
  userDidRegister: false,
  validationCompleted: false,
  ownedRooms: null,
  participantRooms: null,
}

interface ContextProps {
  user: User | null;
  token: string | null;
  userDidRegister: boolean;
  validationCompleted: boolean;
  ownedRooms: Room[] | null;
  participantRooms: Room[] | null;
  signIn: ( loginData: LoginData ) => void;
  singUp: ( registerData: RegisterData ) => void;
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
        getRooms(response.data.user);
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
        getRooms( response.data.user )
        dispatch({ type: 'VALIDATION_COMPLETED' });
      })
      .catch(error => {
        console.log(error)
        dispatch({ type: 'VALIDATION_COMPLETED' });
      })

  }


  const logout = async () => {
    await AsyncStorage.setItem('token', '');
    dispatch({ type: 'LOGOUT' });
  }


  const getRooms = async (user: User) => {
    let ownedRooms = [];
    let participantRooms = [];

    for (let i = 0; i < user.ownedRooms.length; i ++) {
      const id: string = user.ownedRooms[i];
      const { data: room } = await axios.get(`${ API }/rooms/user-room/${ id }`)
      ownedRooms.push(room);
    }

    for (let i = 0; i < user.participantRooms.length; i ++) {
      const id: string = user.participantRooms[i];
      const { data: room } = await axios.get(`${ API }/rooms/user-room/${ id }`);
      participantRooms.push(room);
    }

    dispatch({ type: 'SET_ROOMS', payload: { ownedRooms, participantRooms } })

  }

  return (
    <Context.Provider value={{
        user: state.user,
        token: state.token,
        userDidRegister: state.userDidRegister,
        validationCompleted: state.validationCompleted,
        ownedRooms: state.ownedRooms,
        participantRooms: state.participantRooms,
        signIn,
        singUp,
        validateToken,
        logout,
      }}
    >
    {children}
    </Context.Provider>
  )
}

export default AppContext;