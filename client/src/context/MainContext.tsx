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
  validationCompleted: boolean;
  ownedRooms: Room[] | null;
  participantRooms: Room[] | null;
  selectedRoom: Room | null;
  selectedRoomPosts: Post[] | null;
  signIn: ( loginData: LoginData ) => Promise<{ msg: string }>;
  singUp: ( registerData: RegisterData ) => Promise<{ msg: string }>;
  validateToken: (token: string) => Promise<void>;
  logout: () => void;
  createRoom: ( name: string, password: string ) => Promise<{msg: string}>;
  updateProfilePicture: (data: ImagePickerResponse) => Promise<any>;
  getCurrentRoomInformation: ( id: string ) => Promise<any>;
  addNewPost: (body: string, data: ImagePickerResponse | undefined) => Promise<any>;
  getUserById: ( id: string ) => Promise<User | string>;
  deletePost: (roomId: string, postId: string) => Promise<{msg: string}>;
  deleteRoom: (id: string) => Promise<{msg: string}>;
  changeProfileBackground: (file: ImagePickerResponse) => Promise<{msg: string}>;
  changeSocialMediaIcon: (type: string, link: string) => Promise<any>;
  changeAbout: (about: string) => Promise<{msg: string}>;
  getAllUsersFromRoom: (roomId: string) => Promise<User[]>;
  handleDeleteUserFromRoom: (roomId: string, userId: string) => Promise<{msg: string}>;
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


  const singUp = ({ name, email, password }: RegisterData): Promise<{msg: string}> => {
    return new Promise((resolve, reject) => {
      axios.post(`${ API }/users`, {
          name,
          email,
          password,
        })
        .then(response => {
          resolve({ msg: response.data.msg });
        })
        .catch(error => {
          console.log(error)
          reject({ msg: 'Register failure.' });
        })

    })
  }

  const updateProfilePicture = async ( data: ImagePickerResponse ): Promise<any> => {

    return new Promise(async(resolve, reject) => {
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
          resolve(response.data);
        })
        .catch(error => {
          reject(error)
        })
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


  const createRoom = (name: string, password: string): Promise<{msg: string}> => {

    return new Promise( async (resolve, reject) => {

          if (!name || !password) reject({ msg: 'Missing information.' });
      
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
              validateToken()
              resolve({msg: 'Room created.'})
            })
            .catch(error => {
              reject(error)
            })
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

  }

  const getUserById = (id: string): Promise<User | string> => {
    return new Promise( async (resolve, reject) => {
      const user = await axios.get(`${ API }/users/${ id }`);
      
      if ( ! user ) reject('User not found');

      resolve(user.data);

    })
  }

  const deletePost = async (roomId: string, postId: string): Promise<{ msg: string }> => {
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
  }

  const deleteRoom = (id: string): Promise<{msg: string}> => {
    return new Promise( async(resolve, reject) => {

      const token = await AsyncStorage.getItem('token');
      if (!token) return {msg: 'User not authenticated.'}

      if ( ! id ) return {msg: 'Id is missing.'}

      axios.delete(`${ API }/rooms/delete-room`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        data: {
          id,
          owner: state.user?.id
        }
      })
      .then(response => {
        validateToken();
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
    })
  }

  const changeProfileBackground = (file: ImagePickerResponse): Promise<{msg: string}> => {
    return new Promise( async (resolve, reject) => {

      const token = await AsyncStorage.getItem('token');

      if ( ! token || !state.user ) return { msg: 'Not authenticated' };

      if ( ! file ) return {msg: 'No file'}

      const fileToUpload = {
        uri: file.uri,
        type: file.type,
        name: file.fileName
      };
  
      const formData = new FormData();
  
      formData.append('file', fileToUpload);
      formData.append('userId', state.user.id);

      axios.put(`${ API }/users/change-profile-background`, 
        formData,
        {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        }
      )
      .then((response) => {
        validateToken()
        console.log(response.data)
        resolve({ msg: 'Background changed.' })
      })
      .catch(error => {
        reject(error);
      })
    })
  }

  const changeSocialMediaIcon = (type: string, link: string): Promise<any> => {
      return new Promise(async (resolve, reject) => {

        const token = await AsyncStorage.getItem('token');
        if (!token || !state.user) return {msg: 'Not authenticated.'}
        if (!type || !link) return {msg: 'Missing information'};

        axios.put(`${ API }/users/change-social-media-link`, {
          userId: state.user.id,
          type,
          link
        }, {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        })
        .then(response => {
          validateToken();
          resolve(response.data);
        })
        .catch(error => {
          reject(error)
        })
      })
  }

  const changeAbout = (about: string): Promise<{msg: string}> => {
    return new Promise(async(resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return {msg: 'Not authenticated.'};

      axios.put(`${ API }/users/change-about`, {
        about,
        userId: state.user.id
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then(response => {
        validateToken();
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
    })
  } 

  const getAllUsersFromRoom = (roomId: string): Promise<User[]> => {
    return new Promise(async(resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return {msg: 'Not authenticated.'};

      axios.get(`${ API }/rooms/get-all-users-from-room/${ roomId }`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then(response => {
        resolve(response.data)
      })
      .catch(error => {
        reject(error);
      })
    })
  }

  const handleDeleteUserFromRoom = (roomId: string, userId: string): Promise<{msg: string}> => {
    return new Promise(async(resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return {msg: 'Not authenticated.'};

      if(!roomId || !userId) return {msg: 'Missing information.'}

      axios.delete(`${ API }/rooms/delete-user-from-room`, {
        data: {
          roomId,
          userId,
        },
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then(response => {
        resolve(response.data);
        if (state.selectedRoom) {
          getAllUsersFromRoom(state.selectedRoom.id);
        }
      })
      .catch(error => {
        reject(error);
      })
    })
  }

  
  return (
    <Context.Provider value={{
        user: state.user,
        token: state.token,
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
        deletePost,
        deleteRoom,
        changeProfileBackground,
        changeSocialMediaIcon,
        changeAbout,
        getAllUsersFromRoom,
        handleDeleteUserFromRoom
      }}
    >
    {children}
    </Context.Provider>
  )
}

export default AppContext;