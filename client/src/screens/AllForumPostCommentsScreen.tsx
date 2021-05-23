import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../context/MainContext';
import { ForumPostComment } from '../types/ForumPostComment';

import style from '../styles/screens/roomPostScreen';
import { principalColor } from '../config/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PostOptionModal from '../components/modals/PostOptionModal';

const AllForumPostCommentsScreen = ({ navigation, route }: any) => {

  const { id: forumPostId, authorName, authorProfilePicture, body, image } = route.params;

  const { user, getAllForumPostComments, deleteForumPostComment } = useContext(Context);

  const [commentOptionModal, setCommentOptionModal] = useState(false);
  const [activeSelectedCommentOptions, setActiveSelectedCommentOptions] = useState<ForumPostComment | null>(null);

  const [comments, setComments] = useState<ForumPostComment[]>([]);

  useEffect(() => {
    getAllForumPostComments(forumPostId)
    .then((data: ForumPostComment[]) => setComments(data))
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {}, [])

  const handleDeleteComment = () => {
    if (!activeSelectedCommentOptions) return;
    deleteForumPostComment(activeSelectedCommentOptions.id, forumPostId)
    .then(() => {
      setCommentOptionModal(false);
      getAllForumPostComments(forumPostId).then((data) => setComments(data));
    })
    .catch(error => console.log(error))
  }

  const renderItem = ({item}: {item:ForumPostComment}) => (

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
          width: '100%',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '90%',
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
              uri: item.authorProfilePicture
            }}
          />
          <Text
            style={{
              fontWeight: 'bold',
              opacity: 0.8,
            }}
            >
            {item.authorName}
          </Text>
        </View>
        <View
          style={{
            width: '10%',
            height: '100%',
          }}
        >
          {
            user && user.id === item.authorId &&
            <TouchableOpacity
              onPress={() => {
                setActiveSelectedCommentOptions(item)
                setCommentOptionModal(true)
              }}
            >
              <Icon 
                name='more-vert'
                size={20}
              />
            </TouchableOpacity>
          }
        </View>
      </View>
      <View>
        <Text
          style={{
            opacity: 0.8,
          }}
        >
          {item.body}
        </Text>
      </View>
    </View>
  )

  return (
    <View style={style.postContainer}>
      <View style={style.postInnerContainer}>
        <View style={style.postTopContainer}>
          <View style={style.authorInfoContainer}>
            {
              authorProfilePicture ?
                <Image
                  source={{
                    uri: authorProfilePicture
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
              <Text style={style.authorNameText}>{authorName}</Text>
            </View>
          </View>
        </View>
        <View style={style.textContainer}>
          <Text style={style.text}>{body.trim()}</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginBottom: 5,
            backgroundColor: '#f1f1f1',
          }}
        >
          {
            image &&
              <Pressable
                onPress={() => {
                  // setSelectedImagePostUrl(image);
                }}
              >
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  source={{
                    uri: image,
                  }}
                  width={350}
                  height={350}
                />
              </Pressable>
          }
        </View>
        <FlatList 
          data={comments}
          renderItem={renderItem}
          keyExtractor={item => `${item.body}${item.date}`}
        />
      </View>

      <PostOptionModal 
        modalPostOptionVisible={commentOptionModal}
        setModalPostOptionVisible={setCommentOptionModal}
        activeSelectedPostOptions={activeSelectedCommentOptions}
        handleDeletePost={handleDeleteComment}
      />
    </View>
  );
};

export default AllForumPostCommentsScreen;