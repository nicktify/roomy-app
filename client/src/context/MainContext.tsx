import axios from 'axios';
import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API } from '../config/environment/constants';
import InitialState, { User, LoginData, RegisterData } from '../types/user';
import userReducer from './reducers/UserReducer';
import { Room } from '../types/Room';
import { ImagePickerResponse } from 'react-native-image-picker';

const initialState: InitialState = {
  user: null,
  token: null,
  userDidRegister: false,
  validationCompleted: false,
  ownedRooms: null,
  participantRooms: null,
  selectedRoom: null,
}

interface ContextProps {
  user: User | null;
  token: string | null;
  userDidRegister: boolean;
  validationCompleted: boolean;
  ownedRooms: Room[] | null;
  participantRooms: Room[] | null;
  selectedRoom: Room | null;
  signIn: ( loginData: LoginData ) => void;
  singUp: ( registerData: RegisterData ) => void;
  validateToken: (token: string) => Promise<void>;
  logout: () => void;
  createRoom: ( name: string, password: string ) => Promise<void>;
  updateProfilePicture: (data: ImagePickerResponse) => void;
  getCurrentRoomInformation: ( id: string ) => Promise<any>;
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

  const updateProfilePicture = async ( data: ImagePickerResponse ) => {

    const token = await AsyncStorage.getItem('token');
    if ( ! token ) return;

    const fileToUpload = {
      uri: data.uri,
      type: data.type,
      name: data.fileName
    };

    const formData = new FormData();

    formData.append('file', fileToUpload);
    formData.append('userId', state.user?.id);

    axios.post(`${ API }/users/add-profile-picture`,
        formData,
        { headers: { Authorization: `Bearer ${JSON.parse(token)}` }}
      )
      .then(response => {
        validateToken();
      })
      .catch(error => {
        console.log(error)
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

    try {


      const token = await AsyncStorage.getItem('token');

      if ( ! token ) return;

      let ownedRooms: Room[] = [];
      let participantRooms: Room[] = [];
  
      const insert = ( arr: Room[], room: Room ) => [
        room,
        ...arr
      ]
  
      for (let i = 0; i < user.ownedRooms.length; i ++) {
        const id: string = user.ownedRooms[i];
        const { data: room } = await axios.get(`${ API }/rooms/user-room/${ id }`, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        })
        ownedRooms = insert(ownedRooms, room)
      }
  
      for (let i = 0; i < user.participantRooms.length; i ++) {
        const id: string = user.participantRooms[i];
        const { data: room } = await axios.get(`${ API }/rooms/user-room/${ id }`, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        });
        participantRooms = insert(participantRooms, room)
      }
  
      dispatch({ type: 'SET_ROOMS', payload: { ownedRooms, participantRooms } })
      
    } catch (error) {
      console.log(error)
    }

  }


  const createRoom = async (name: string, password: string) => {

    const token = await AsyncStorage.getItem('token');

    if ( ! token ) return;

    axios.post(`${ API }/rooms`, {
        name,
        password,
        owner: state.user?.id
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then(() => {
        if (state.user) {
          // TODO: make a proper route for this task, you only need to fetch the new user data, and not revalidate the token
          validateToken()
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  const getCurrentRoomInformation = async ( id: string ) => {

    try {
      
          const token = await AsyncStorage.getItem('token');
          if ( ! token ) return;
      
          return new Promise((resolve, reject) => {
      
            let selectedRoom: Room | undefined = state.ownedRooms?.filter(room => room.id === id)[0];
            if ( ! selectedRoom ) {
              selectedRoom = state.participantRooms?.filter(room => room.id === id)[0];
            }
      
            if ( ! selectedRoom ) return reject('Can\'t find room')
      
            dispatch({ type: 'SET_SELECTED_ROOM', payload: selectedRoom })
      
            resolve(selectedRoom);
          })
      
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <Context.Provider value={{
        user: state.user,
        token: state.token,
        userDidRegister: state.userDidRegister,
        validationCompleted: state.validationCompleted,
        ownedRooms: state.ownedRooms,
        participantRooms: state.participantRooms,
        selectedRoom: state.selectedRoom,
        signIn,
        singUp,
        validateToken,
        logout,
        createRoom,
        updateProfilePicture,
        getCurrentRoomInformation,
      }}
    >
    {children}
    </Context.Provider>
  )
}

export default AppContext;