import React, { createContext, useReducer } from 'react';
import { InitialState } from '../types/user';
import UserReducer from './reducers/UserReducer';

const initialState: InitialState = {
  user: {
    email: '',
    id: '',
    name: '',
    ownedRooms: [],
    participantRooms: [],
    role: '',
  }
}

interface ContextProps {
  state: InitialState;
  dispatch: React.DispatchWithoutAction;
}

export const Context = createContext({} as ContextProps);

const MainContext = ({ children }: any) => {
  const [ state, dispatch ] = useReducer(UserReducer, initialState);

  return (
    <Context.Provider value={{
      state,
      dispatch
    }}>
    {children}
    </Context.Provider>
  )
}

export default MainContext;