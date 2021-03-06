import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from './DrawerNavigation';
import LoadingScreen from '../screens/LoadingScreen';
import { Context } from '../context/MainContext';
import AuthNavigation from './AuthNavigation';
import SearchRoomScreen from '../screens/forms/SearchRoomScreen';
import { RoomNavigation } from './ButtomTabNavigation';
import AddUserToRoomScreen from '../screens/forms/AddUserToRoomScreen';
import NewPostForm from '../screens/forms/NewPostFormScreen';
import EditAboutFormScreen from '../screens/forms/EditAboutFormScreen';
import SearchUserFromRoom from '../screens/forms/SearchUserFromRoom';
import NewForumPostForm from '../screens/forms/AddNewForumPostScreen';
import AddNewForumPostCommentScreen from '../screens/forms/AddNewForumPostCommentScreen';
import AllForumPostCommentsScreen from '../screens/rooms/AllForumPostCommentsScreen';
import RenameRoomFormScreen from '../screens/forms/RenameRoomFormScreen';

const Stack = createStackNavigator();

const AppNavigation = () => {
  const { validationCompleted, user } = useContext( Context );

  if ( ! validationCompleted ) return <LoadingScreen />

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          user ?
            <>
              <Stack.Screen name="HomeNavigation" component={ DrawerNavigation } />
              <Stack.Screen name="SearchRoom" component={ SearchRoomScreen } />
              <Stack.Screen name="Room" component={ RoomNavigation } />
              <Stack.Screen name="AddUserToRoom" component={ AddUserToRoomScreen } />
              <Stack.Screen name="NewPostForm" component={ NewPostForm } />
              <Stack.Screen name="NewForumPostForm" component={ NewForumPostForm } />
              <Stack.Screen name="NewForumPostCommentForm" component={ AddNewForumPostCommentScreen } />
              <Stack.Screen name="ForumPostInformation" component={ AllForumPostCommentsScreen } />
              <Stack.Screen name="EditAboutForm" component={ EditAboutFormScreen } />
              <Stack.Screen name="SearchUserFromRoom" component={ SearchUserFromRoom } />
              <Stack.Screen name="RenameRoom" component={ RenameRoomFormScreen } />
            </>
          :
            <Stack.Screen name="AuthNavigation" component={ AuthNavigation } />
        }
      </Stack.Navigator>
  );
};

export default AppNavigation;