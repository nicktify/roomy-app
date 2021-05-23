import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, Image, Pressable, TouchableOpacity } from 'react-native';
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
        <View>
          {
            item.latestComment &&
            <View
              style={{
                width: '90%',
                alignSelf: 'flex-end',
                borderTopWidth: 0.3,
                borderTopColor: '#b5b5b5',
                padding: 5,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image 
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                    marginRight: 10,
                  }}
                  source={{
                    uri: item.latestComment.authorProfilePicture
                  }}
                />
                <Text
                  style={{
                    fontWeight: 'bold',
                    opacity: 0.8,
                  }}
                >
                  {item.latestComment.authorName}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    opacity: 0.8,
                  }}
                >
                  {item.latestComment.body}
                </Text>
              </View>
            </View>
          }
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              width: 150,
              alignItems: 'center',
              padding: 5,
              marginRight: 5,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}
            onPress={() => navigation.navigate('NewForumPostCommentForm', {
              ...item
            })}
          >
            <Text
              style={{
                color: 'black',
                opacity: 0.8,
              }}
            >
              ADD COMMENT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                width: '20%',
                alignItems: 'center',
                padding: 5,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }}
              onPress={() => navigation.navigate('ForumPostInformation', {
                ...item,
              })}
            >
              <Text
                style={{
                  opacity: 0.8,
                  color: 'black',
                }}
              >
                MORE
              </Text>
            </TouchableOpacity>
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