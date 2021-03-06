import React, { useContext, useEffect, useState } from 'react';
import { Image, Pressable, Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Context } from '../../context/MainContext';
import { principalColor } from '../../config/colors';
import { Post } from '../../types/Post';
import style from '../../styles/screens/room/roomPostScreen';
import PostOptionModal from '../../components/modals/PostOptionModal';
import ImagePostPreviewModal from '../../components/modals/ImagePostPreviewModal';

class SelectedPost {
  body: string;
  image: string;
  authorProfilePicture: string;
  authorName: string;
  id: string;
}

const RoomPostsScreen = ({navigation}: any) => {
  const { selectedRoom, user, selectedRoomPosts, deletePost } = useContext(Context);

  const [activeSelectedPostOptions, setActiveSelectedPostOptions] = useState<SelectedPost>({ id: '', body: '', image: '', authorProfilePicture: '', authorName: '' });
  const [modalPostOptionVisible, setModalPostOptionVisible] = useState(false);
  const [selectedImagePostUrl, setSelectedImagePostUrl] = useState('');

  const userIsOwner = selectedRoom && user && selectedRoom.owners.includes(user.id);

  useEffect(() => { }, [selectedRoomPosts]);

  const handlePostOption = (post: SelectedPost) => {
    setModalPostOptionVisible(true);
    setActiveSelectedPostOptions(post);
  };

  const handleDeletePost = () => {
    if (!selectedRoom) return;
    deletePost(selectedRoom.id, activeSelectedPostOptions.id);
    setModalPostOptionVisible(false);
  };

  const renderItem = ({ item }: { item: Post; }) => (
    <View style={style.postContainer}>
      <View style={style.postInnerContainer}>
        <View style={style.postTopContainer}>
          <View style={style.authorInfoContainer}>
            {
              item.authorProfilePicture ?
                <Image
                  source={{
                    uri: item.authorProfilePicture
                  }}
                  style={style.authorProfileImage}
                />
                :
                <Icon
                  style={style.authorProfileImage}
                  name="account-circle"
                  size={50}
                  color={principalColor}
                />
            }
            <View style={style.authorNameContainer}>
              <Text style={style.authorNameText}>{item.authorName}</Text>
            </View>
          </View>
          <View style={style.postMoreVertIconContainer}>
            {
              user?.id === item.authorId &&
                <Icon
                  name='more-vert'
                  size={25}
                  onPress={() => {
                    handlePostOption({
                      id: item.id,
                      body: item.body,
                      image: item.image?.url,
                      authorProfilePicture: item.authorProfilePicture,
                      authorName: item.authorName
                    });
                  }}
                />
            }
          </View>
        </View>
        <View style={style.textContainer}>
          <Text style={style.text}>{item.body.trim()}</Text>
        </View>
        <View style={style.postImageContainer}>
          {
            item.image && item.image.url &&
              <Pressable
                onPress={() => {
                  setSelectedImagePostUrl( item.image.url )
                }}
              >
                <Image
                  style={style.postImage}
                  source={{
                    uri: item.image.url,
                  }}
                  width={350}
                  height={350}
                />
              </Pressable>
          }
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={style.root}>
      <FlatList
        data={selectedRoomPosts}
        renderItem={renderItem}
        keyExtractor={item => `${item.body}${item.date}`}
        ListFooterComponent={<View style={{ width: '100%', height: 60 }}></View>}
        ListHeaderComponent={<View style={{ width: '100%', height: 20 }}></View>}
      />
      {
        userIsOwner &&
          <Icon
            style={style.addNewPostIcon}
            name="add"
            color='white'
            size={40}
            onPress={() => navigation.navigate('NewPostForm')}
          />
      }

      <PostOptionModal 
        modalPostOptionVisible={modalPostOptionVisible}
        setModalPostOptionVisible={setModalPostOptionVisible}
        activeSelectedPostOptions={activeSelectedPostOptions}
        handleDeletePost={handleDeletePost}
      />

      <ImagePostPreviewModal 
        selectedImagePostUrl={selectedImagePostUrl}
        setSelectedImagePostUrl={setSelectedImagePostUrl}
      />

    </SafeAreaView>
  );
};

export default RoomPostsScreen;