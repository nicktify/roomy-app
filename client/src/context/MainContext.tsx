import axios from 'axios';
import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API } from '../config/environment/constants';
import InitialState, { User, LoginData, RegisterData } from '../types/user';
import userReducer from './reducers/UserReducer';
import { Room } from '../types/Room';
import { ImagePickerResponse } from 'react-native-image-picker';
import { Post } from '../types/Post';

const initialState: InitialState = {
  user: null,
  token: null,
  userDidRegister: false,
  validationCompleted: false,
  ownedRooms: null,
  participantRooms: null,
  selectedRoom: null,
  selectedRoomPosts: null,
}

interface ContextProps {
  user: User | null;
  token: string | null;
  userDidRegister: boolean;
  validationCompleted: boolean;
  ownedRooms: Room[] | null;
  participantRooms: Room[] | null;
  selectedRoom: Room | null;
  selectedRoomPosts: Post[] | null;
  signIn: ( loginData: LoginData ) => Promise<{ msg: string }>;
  singUp: ( registerData: RegisterData ) => void;
  validateToken: (token: string) => Promise<void>;
  logout: () => void;
  createRoom: ( name: string, password: string ) => Promise<void>;
  updateProfilePicture: (data: ImagePickerResponse) => void;
  getCurrentRoomInformation: ( id: string ) => Promise<any>;
  addNewPost: (body: string, data: ImagePickerResponse | undefined) => Promise<any>;
  getUserById: ( id: string ) => Promise<User | string>;
  deletePost: (roomId: string, postId: string) => Promise<{msg: string}>;
}

export const Context = createContext({} as ContextProps);

const AppContext = ({ children }: any) => {

  const [ state, dispatch ] = useReducer(userReducer, initialState);

  useEffect(() => {
    validateToken();
  }, [])


  const signIn = ({ email, password }: LoginData ): Promise<{ msg: string}> => {

    return new Promise((resolve, reject) => {
      axios.post(`${ API }/users/auth/login`, {
          email: email.toLowerCase(),
          password
        })
        .then( async response => {
          await AsyncStorage.setItem('token', JSON.stringify(response.data.access_token));
          getRooms(response.data.user);
          dispatch({ type: 'SIGN_IN', payload: { token: response.data.access_token, user: response.data.user } });
          resolve({ msg: 'Authenticated' });
        })
        .catch(error => {
          reject(error)
        })
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
    await AsyncStorage.removeItem('token');
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

  const getCurrentRoomInformation = async (id: string | undefined): Promise<any> => {

    if (!id) return;
    
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      return new Promise(async (resolve, reject) => {

        let selectedRoom: Room | undefined = state.ownedRooms?.filter(room => room.id === id)[0];
        if (!selectedRoom) {
          selectedRoom = state.participantRooms?.filter(room => room.id === id)[0];
        }

        if (!selectedRoom) return reject('Can\'t find room');

        dispatch({ type: 'SET_SELECTED_ROOM', payload: selectedRoom });


        const fetchPost = await axios.get(`${ API }/posts/get-all-posts/${id}`, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        })

        const posts = fetchPost.data;

        dispatch({ type: 'SET_ROOM_POSTS', payload: posts });


        resolve(selectedRoom);
      });

    } catch (error) {
      console.log(error);
    }
  }

  const addNewPost = async (body: string, data: ImagePickerResponse | undefined): Promise<any> => {

    try {

      return new Promise( async ( resolve, reject ) => {
        const token = await AsyncStorage.getItem('token');
        if ( ! token ) return;
  
        const fileToUpload = {
          uri: data?.uri,
          type: data?.type,
          name: data?.fileName
        };
    
        const formData = new FormData();
    
        data && formData.append('file', fileToUpload);
        formData.append('roomId', state.selectedRoom?.id);
        formData.append('authorId', state.user?.id);
        formData.append('authorProfilePicture', state.user?.profilePicture);
        formData.append('authorName', state.user?.name);
        formData.append('body', body);
    
        axios.post(`${ API }/posts/add`,
            formData,
            { headers: { Authorization: `Bearer ${JSON.parse(token)}` }}
          )
          .then((response) => {
            validateToken();
            getCurrentRoomInformation(state.selectedRoom?.id);
            resolve(response.data)
          })
          .catch(error => {
            reject(error);
          })

      })
      

    } catch (error) {
      console.log(error);
    }

  }

  const getUserById = (id: string): Promise<User | string> => {
    return new Promise( async (resolve, reject) => {
      const user = await axios.get(`${ API }/users/${ id }`);
      
      if ( ! user ) reject('User not found');

      resolve(user.data);

    })
  }

  const deletePost = async (roomId: string, postId: string): Promise<{ msg: string }> => {
    try {
      const token = await AsyncStorage.getItem('token');
      if ( ! token ) return { msg: 'No token found'};

      if (!roomId || !postId) return { msg: 'RoomId or PostId is missing' };

      return new Promise(( resolve, reject ) => {
        axios.delete(`${ API }/posts/delete-post`, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
          data: {
            roomId,
            postId
          }
        })
        .then(response => {
          console.log(response.data);
          return state?.user && getRooms(state?.user);
        })
        .then(() => {
          getCurrentRoomInformation(state.selectedRoom?.id);
          resolve({ msg: 'Post delted' });
        })
        .catch(error => {
          console.log(error);
          reject({ msg: 'Something went bad' });
        })
      })
    } catch (error) {
      return {msg: 'Something went bad'}
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
        selectedRoomPosts: state.selectedRoomPosts,
        signIn,
        singUp,
        validateToken,
        logout,
        createRoom,
        updateProfilePicture,
        getCurrentRoomInformation,
        addNewPost,
        getUserById,
        deletePost
      }}
    >
    {children}
    </Context.Provider>
  )
}

export default AppContext;