import React, { createContext, useEffect, useReducer } from 'react';
import { ImagePickerResponse } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import appReducer from './reducers/appReducer';
import { API } from '../config/environment/constants';
import { User, LoginData, RegisterData } from '../types/user';
import { InitialState } from '../types/InitialState';
import { Room } from '../types/Room';
import { Post } from '../types/Post';
import { ForumPost } from '../types/ForumPost';
import { ForumPostComment } from '../types/ForumPostComment';

const initialState: InitialState = {
  user: null,
  token: null,
  userDidRegister: false,
  validationCompleted: false,
  rooms: null,
  selectedRoom: null,
  selectedRoomPosts: null,
  selectedRoomUsers: null,
  selectedRoomForumPosts: null,
  searchedUser: null,
  selectedForumPostComments: null,
};

interface ContextProps {
  user: User | null;
  token: string | null;
  validationCompleted: boolean;
  selectedRoom: Room | null;
  rooms: Room[] | null;
  selectedRoomPosts: Post[] | null;
  selectedRoomUsers: User[] | null;
  selectedRoomForumPosts: ForumPost[] | null;
  searchedUser: User | null;
  selectedForumPostComments: ForumPostComment[] | null;
  signIn: (loginData: LoginData) => Promise<{ msg: string; }>;
  singUp: (registerData: RegisterData) => Promise<{ msg: string; }>;
  validateToken: (token: string) => Promise<void>;
  logout: () => void;
  getUserById: (id: string) => Promise<User | string>;
  updateProfilePicture: (data: ImagePickerResponse) => Promise<any>;
  changeProfileBackground: (file: ImagePickerResponse) => Promise<{ msg: string; }>;
  changeSocialMediaIcon: (type: string, link: string) => Promise<any>;
  getRooms: () => any;
  createRoom: (name: string) => Promise<{ msg: string; }>;
  addNewPost: (body: string, data: ImagePickerResponse | undefined) => Promise<any>;
  deletePost: (roomId: string, postId: string) => Promise<{ msg: string; }>;
  deleteRoom: (id: string) => Promise<{ msg: string; }>;
  changeAbout: (about: string) => Promise<{ msg: string; }>;
  handleDeleteUserFromRoom: (roomId: string, userId: string) => Promise<{ msg: string; }>;
  makeUserOwnerOfRoom: (userId: string) => Promise<{ msg: string; }>;
  makeUserParticipantOfRoom: (userId: string) => Promise<{ msg: string; }>;
  getRoomById: () => Promise<any>;
  getCurrentRoomPosts: (roomId: string) => Promise<any>;
  getAllUsersFromRoom: (roomId: string) => Promise<User[]>;
  setSelectedRoom: (roomId: string) => Promise<any>;
  getAllRoomInformation: (roomId: string) => Promise<any>;
  fetchUserByEmail: (email: string) => Promise<any>;
  cleanSearchedUser: () => void;
  createNewForumPost: (body: string, data: ImagePickerResponse | undefined) => Promise<any>;
  deleteForumPost: (forumPostId: string) => Promise<any>;
  addForumPostComment: (forumPostId: string, body: string) => Promise<any>;
  getAllForumPostComments: (forumPostId: string) => Promise<any>;
  deleteForumPostComment: (forumPostCommentId: string, forumPostId: string) => Promise<any> 
}

export const Context = createContext({} as ContextProps);

const AppContext = ({ children }: any) => {

  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    validateToken();
  }, []);

  const signIn = ({ email, password }: LoginData): Promise<{ msg: string; }> => {

    return new Promise((resolve, reject) => {
      axios.post(`${API}/users/auth/login`, {
        email: email.toLowerCase(),
        password
      })
        .then(async response => {
          await AsyncStorage.setItem('token', JSON.stringify(response.data.access_token));
          dispatch({ type: 'SIGN_IN', payload: { token: response.data.access_token, user: response.data.user } });
          resolve({ msg: 'Authenticated' });
        })
        .catch(error => {
          reject(error);
        });
    });
  };


  const singUp = ({ name, email, password }: RegisterData): Promise<{ msg: string; }> => {
    return new Promise((resolve, reject) => {
      axios.post(`${API}/users`, {
        name,
        email,
        password,
      })
        .then(response => {
          resolve({ msg: response.data.msg });
        })
        .catch(error => {
          console.log(error);
          reject({ msg: 'Register failure.' });
        });
    });
  };

  const updateProfilePicture = async (data: ImagePickerResponse): Promise<any> => {

    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const fileToUpload = {
        uri: data.uri,
        type: data.type,
        name: data.fileName
      };

      const formData = new FormData();

      formData.append('file', fileToUpload);
      formData.append('userId', state.user?.id);

      axios.post(`${API}/users/add-profile-picture`,
        formData,
        { headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(response => {
          validateToken();
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };


  const validateToken = async () => {

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      dispatch({ type: 'VALIDATION_COMPLETED' });
      return;
    }

    axios.post(`${API}/users/auth/validate-token`,
      undefined,
      { headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    })
      .then(response => {
        dispatch({ type: 'SIGN_IN', payload: { token: response.data.access_token, user: response.data.user } });
        getRooms().then(() => dispatch({ type: 'VALIDATION_COMPLETED' }));
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: 'VALIDATION_COMPLETED' });
      });

  };


  const logout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };


  const getRooms = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token || !state.user) return;

    axios.get(`${API}/rooms/get-all-rooms-from-user/${state.user.id}`, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    })
      .then(response => {
        dispatch({ type: 'SET_ROOMS', payload: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  };


  const createRoom = (name: string): Promise<{ msg: string; }> => {

    return new Promise(async (resolve, reject) => {
      if (!name) reject({ msg: 'Missing information.' });

      const token = await AsyncStorage.getItem('token');

      if (!token) return;

      axios.post(`${API}/rooms`, {
        name,
        owner: state.user?.id
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(() => {
          validateToken();
          resolve({ msg: 'Room created.' });
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const setSelectedRoom = (roomId: string | undefined): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!roomId) return reject('Missing roomId');
      if (!state.rooms) return reject('Missing rooms in state');

      const selectedRoom = state.rooms.filter((room: Room) => room.id === roomId)[0];

      dispatch({ type: 'SET_SELECTED_ROOM', payload: selectedRoom });
      resolve('done');
    });
  };

  const getAllRoomInformation = (roomId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');

      if (!token) return reject('Not authenticated');
      if (!roomId) return reject('Not room');

      axios.get(`${API}/rooms/get-all-room-information/${roomId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(response => {
          dispatch({
            type: 'SET_ROOM_INFORMATION',
            payload: { posts: response.data.posts, users: response.data.users, forumPosts: response.data.forumPosts }
          });
          resolve('done');
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const getCurrentRoomPosts = (roomId: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');

      if (!token) return;
      if (!state.selectedRoom) return;

      axios.get(`${API}/posts/get-all-posts/${roomId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(response => {
          dispatch({ type: 'SET_ROOM_POSTS', payload: response.data });
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const addNewPost = async (body: string, data: ImagePickerResponse | undefined): Promise<any> => {
    return new Promise(async (resolve, reject) => {

      const token = await AsyncStorage.getItem('token');
      if (!token) return;
      if (!state.selectedRoom || !state.user) return 'Missing information';

      const formData = new FormData();
      data && formData.append('file', {
        uri: data.uri,
        type: data.type,
        name: data.fileName
      });
      formData.append('roomId', state.selectedRoom.id);
      formData.append('authorId', state.user.id);
      formData.append('authorProfilePicture', state.user.profilePicture);
      formData.append('authorName', state.user?.name);
      formData.append('body', body);

      axios.post(`${API}/posts/add`,
        formData,
        { headers: { Authorization: `Bearer ${JSON.parse(token)}` } }
      )
        .then((response) => {
          validateToken();
          state.selectedRoom && getCurrentRoomPosts(state.selectedRoom.id);
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });

  };

  const getUserById = (id: string): Promise<User | string> => {
    return new Promise(async (resolve, reject) => {
      const user = await axios.get(`${API}/users/get-by-id/${id}`);

      if (!user) reject('User not found');

      resolve(user.data);
    });
  };

  const deletePost = async (roomId: string, postId: string): Promise<{ msg: string; }> => {
    const token = await AsyncStorage.getItem('token');
    if (!token) return { msg: 'No token found' };

    if (!roomId || !postId) return { msg: 'RoomId or PostId is missing' };

    return new Promise((resolve, reject) => {
      axios.delete(`${API}/posts/delete-post`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        data: {
          roomId,
          postId
        }
      })
        .then(() => {
          return getRooms();
        })
        .then(() => {
          state.selectedRoom && getCurrentRoomPosts(state.selectedRoom.id);
          resolve({ msg: 'Post delted' });
        })
        .catch(error => {
          console.log(error);
          reject({ msg: 'Something went bad' });
        });
    });
  };

  const deleteRoom = (id: string): Promise<{ msg: string; }> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');

      if (!token) return { msg: 'User not authenticated.' };
      if (!id) return { msg: 'Id is missing.' };

      axios.delete(`${API}/rooms/delete-room`, {
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
        });
    });
  };

  const changeProfileBackground = (file: ImagePickerResponse): Promise<{ msg: string; }> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');

      if (!token || !state.user) return reject('Not authenticated.');
      if (!file) return reject('no file');

      const fileToUpload = {
        uri: file.uri,
        type: file.type,
        name: file.fileName
      };

      const formData = new FormData();
      formData.append('file', fileToUpload);
      formData.append('userId', state.user.id);

      axios.put(`${API}/users/change-profile-background`,
        formData,
        {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` }
        }
      )
        .then(() => {
          validateToken();
          resolve({ msg: 'Background changed.' });
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const changeSocialMediaIcon = (type: string, link: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {

      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return reject('Not authenticated.');
      if (!type) return reject('Missing information');

      axios.put(`${API}/users/change-social-media-link`, {
        userId: state.user.id,
        type,
        link
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(response => {
          console.log(response.data)
          validateToken();
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const changeAbout = (about: string): Promise<{ msg: string; }> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return { msg: 'Not authenticated.' };

      axios.put(`${API}/users/change-about`, {
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
        });
    });
  };

  const getAllUsersFromRoom = (): Promise<User[]> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return { msg: 'Not authenticated.' };

      if (!state.selectedRoom) return { msg: 'Missing room.' };

      axios.get(`${API}/rooms/get-all-users-from-room/${state.selectedRoom.id}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(response => {
          dispatch({ type: 'SET_ROOM_USERS', payload: response.data });
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const handleDeleteUserFromRoom = (roomId: string, userId: string): Promise<{ msg: string; }> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return { msg: 'Not authenticated.' };

      if (!roomId || !userId) return { msg: 'Missing information.' };

      axios.delete(`${API}/rooms/delete-user-from-room`, {
        data: {
          roomId,
          userId,
        },
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(response => {
          resolve(response.data);
          if (state.selectedRoom) {
            getRoomById().then(() => getAllUsersFromRoom());
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const makeUserOwnerOfRoom = (userId: string): Promise<{ msg: string; }> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return { msg: 'Not authenticated.' };

      if (!state.selectedRoom || !userId) return { msg: 'Missing information.' };
      axios.put(`${API}/rooms/make-user-owner-of-room`, {
        userId,
        roomId: state.selectedRoom.id,
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(response => {
          getRoomById();
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const makeUserParticipantOfRoom = (userId: string): Promise<{ msg: string; }> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return { msg: 'Not authenticated.' };

      if (!state.selectedRoom || !userId) return { msg: 'Missing information.' };
      axios.put(`${API}/rooms/make-user-participant-of-room`, {
        userId,
        roomId: state.selectedRoom.id,
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(response => {
          getRoomById().then(() => resolve(response.data));
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  const getRoomById = (): Promise<{ msg: string; }> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');

      if (!token || !state.user) return { msg: 'Not authenticated.' };
      if (!state.selectedRoom) return { msg: 'Missing information' };

      axios.get(`${API}/rooms/user-room/${state.selectedRoom.id}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(response => {
          dispatch({ type: 'SET_SELECTED_ROOM', payload: response.data });
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  };


  const getAllRoomForumPost = (): Promise<any> => {
    return new Promise(async(resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return 'Not authenticated.'
      if (!state.selectedRoom) return 'Missing information.'
      axios.get(`${API}/forum/get-all-room-forum-posts/${state.selectedRoom.id}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then(response => {
        dispatch({ type: 'SET_ROOM_FORUM_POSTS', payload: response.data })
      })
      .catch(error => {
        console.log(error)
      })
    })
  }

  const fetchUserByEmail = (email: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token) return;
  
      axios.get(`${API}/users/get-by-email/${email}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
        .then(response => {
          if (!response.data.msg) {
            dispatch({ type: 'SET_SEARCHED_USER', payload: response.data });
            resolve(response.data);
          }
          if (response.data.msg === 'User not exist.') {
            reject(response.data.msg);
          }
        })
        .catch(error => {
          reject(error);
        });
    })
  };

  const cleanSearchedUser = () => {
    dispatch({ type: 'CLEAN_SEARCHED_USER' })
  }

  const createNewForumPost = (body: string, data: ImagePickerResponse | undefined): Promise<any> => {
    return new Promise(async(resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return 'Not authenticated.';
      if (!state.selectedRoom) return 'Missing information.';
      if (!body) return 'Missing information.';

      const formData = new FormData();
      data && formData.append('file', {
        uri: data.uri,
        type: data.type,
        name: data.fileName
      });
      formData.append('authorId', state.user.id)
      formData.append('roomId', state.selectedRoom.id)
      formData.append('body', body);

      axios.post(`${API}/forum/create-new-forum-post`, formData, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then(response => {
        getAllRoomForumPost()
        resolve(response.data);
      })
      .catch(error => {
        reject(error)
      })
    })
  }


  const deleteForumPost = (forumPostId: string): Promise<any> => {
    return new Promise(async(resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return 'Not authenticated.';
      if (!forumPostId) return 'Missing information.';
      axios.delete(`${API}/forum/delete-forum-post/${forumPostId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then(response => {
        getAllRoomForumPost()
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      })
    })
  }

  const addForumPostComment = (forumPostId: string, body: string): Promise<any> => {
    return new Promise(async(resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return 'Not authenticated.';
      if (!forumPostId || !body) return 'Missing information.';
      axios.post(`${API}/forum/add-forum-post-comment`, {
        forumPostId,
        authorId: state.user.id,
        body,
      }, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then(response => {
        getAllRoomForumPost()
        resolve(response.data)
      })
      .catch(error => {
        reject(error);
      })
    })
  }

  const getAllForumPostComments = (forumPostId: string): Promise<any> => {
    return new Promise(async(resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if(!token || !state.user) return 'Not authenticated.';
      if (!forumPostId) return 'Missing information.';
      axios.get(`${API}/forum/get-all-forum-post-comments/${forumPostId}`, {
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then(response => {
        getAllRoomForumPost()
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
    })
  }

  const deleteForumPostComment = (forumPostCommentId: string, forumPostId: string): Promise<any> => {
    return new Promise(async(resolve, reject) => {
      const token = await AsyncStorage.getItem('token');
      if (!token || !state.user) return 'Not authenticated.';
      if (!forumPostCommentId || !forumPostId) return 'Missing information.';
      axios.delete(`${API}/forum/delete-forum-post-comment`, {
        data: {
          forumPostCommentId,
          forumPostId
        }, 
        headers: { Authorization: `Bearer ${JSON.parse(token)}` }
      })
      .then(response => {
        getAllRoomForumPost()
        resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
    })
  }

  return (
    <Context.Provider value={{
      user: state.user,
      token: state.token,
      validationCompleted: state.validationCompleted,
      rooms: state.rooms,
      selectedRoom: state.selectedRoom,
      selectedRoomPosts: state.selectedRoomPosts,
      selectedRoomUsers: state.selectedRoomUsers,
      searchedUser: state.searchedUser,
      selectedRoomForumPosts: state.selectedRoomForumPosts,
      selectedForumPostComments: state.selectedForumPostComments,
      signIn,
      singUp,
      validateToken,
      logout,
      createRoom,
      updateProfilePicture,
      setSelectedRoom,
      addNewPost,
      getUserById,
      deletePost,
      deleteRoom,
      changeProfileBackground,
      changeSocialMediaIcon,
      changeAbout,
      getAllUsersFromRoom,
      handleDeleteUserFromRoom,
      makeUserOwnerOfRoom,
      makeUserParticipantOfRoom,
      getRoomById,
      getRooms,
      getCurrentRoomPosts,
      getAllRoomInformation,
      fetchUserByEmail,
      cleanSearchedUser,
      createNewForumPost,
      deleteForumPost,
      addForumPostComment,
      getAllForumPostComments,
      deleteForumPostComment,
    }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;