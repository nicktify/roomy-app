import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { principalColor } from '../../config/colors';
import { Context } from '../../context/MainContext';
import { ForumPost } from '../../types/ForumPost';
import style from '../../styles/screens/roomPostScreen';
import PostOptionModal from '../../components/modals/PostOptionModal';
import ImagePostPreviewModal from '../../components/modals/ImagePostPreviewModal';

class SelectedForumPost {
  body: string;
  image: string;
  authorProfilePicture: string;
  authorName: string;
  id: string;
}

const ForumScreen = ({ navigation }: any) => {
  const { user, selectedRoom, selectedRoomForumPosts, deleteForumPost } = useContext(Context);

  const [activeSelectedPostOptions, setActiveSelectedPostOptions] = useState<SelectedForumPost>({ id: '', body: '', image: '', authorProfilePicture: '', authorName: '' });
  const [modalPostOptionVisible, setModalPostOptionVisible] = useState(false);
  const [selectedImagePostUrl, setSelectedImagePostUrl] = useState('');

  useEffect(() => {}, [selectedRoomForumPosts])

  const handlePostOption = (post: SelectedForumPost) => {
    setModalPostOptionVisible(true);
    setActiveSelectedPostOptions(post);
  };

  const handleDeletePost = () => {
    if (!selectedRoom) return;
    deleteForumPost(activeSelectedPostOptions.id);
  };

  const renderItem = ({ item }: { item: ForumPost; }) => (
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
                  size={80}
                  color={principalColor}
                />
            }
            <View style={style.authorNameContainer}>
              <Text style={style.authorNameText}>{item.authorName}</Text>
            </View>
          </View>
          <View
            style={{
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {
              user && user.id === item.authorId &&
                <Icon
                  name='more-vert'
                  size={25}
                  onPress={() => {
                    handlePostOption({
                      id: item.id,
                      body: item.body,
                      image: item.image,
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
        <View
          style={{
            alignItems: 'center',
            marginBottom: 5,
            backgroundColor: '#f1f1f1',
          }}
        >
          {
            item.image &&
              <Pressable
                onPress={() => {
                  setSelectedImagePostUrl(item.image);
                }}
              >
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{
                    uri: item.image,
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
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        data={selectedRoomForumPosts}
        renderItem={renderItem}
        keyExtractor={item => `${item.body}${item.date}`}
        ListFooterComponent={<View style={{ width: '100%', height: 60 }}></View>}
        ListHeaderComponent={<View style={{ width: '100%', height: 20 }}></View>}
      />
      <Icon
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: 15,
          backgroundColor: principalColor,
          borderRadius: 50,
        }}
        name="add"
        color='white'
        size={40}
        onPress={() => navigation.navigate('NewForumPostForm')}
      />

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
    </View>
  );
};

export default ForumScreen;