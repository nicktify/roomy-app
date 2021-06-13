import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Context } from '../context/MainContext';
import { ForumPostComment } from '../types/ForumPostComment';
import { principalColor } from '../config/colors';
import PostOptionModal from '../components/modals/PostOptionModal';
import styles from '../styles/screens/allForumPostComments';

const AllForumPostCommentsScreen = ({ route }: any) => {

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
    <View style={styles.renderItemContainer}>
      <View style={styles.renderItemInnerContainer}>
        <View style={styles.renderItemProfileContainer}>
          {
            item.authorProfilePicture ?
              <Image style={styles.renderItemProfileImage} source={{ uri: item.authorProfilePicture }} />
              :
              <Icon
                style={styles.renderItemIcon}
                name="account-circle"
                size={28}
                color={principalColor}
              />
          }
          <Text style={styles.renderItemAuthorNameText} >
            {item.authorName}
          </Text>
        </View>
        <View style={styles.renderItemMoreVertContainer}>
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
        <Text style={styles.renderItemBodyText}>
          {item.body}
        </Text>
      </View>
    </View>
  )

  return (
    <View style={styles.postContainer}>
      <View style={styles.postInnerContainer}>
        <View style={styles.postTopContainer}>
          <View style={styles.authorInfoContainer}>
            {
              authorProfilePicture ?
                <Image
                  source={{
                    uri: authorProfilePicture
                  }}
                  style={styles.authorProfileImage}
                />
                :
                <Icon
                  style={styles.authorProfileImage}
                  name="account-circle"
                  size={38}
                  color={principalColor}
                />
            }
            <View style={styles.authorNameContainer}>
              <Text style={styles.authorNameText}>{authorName}</Text>
            </View>
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{body.trim()}</Text>
        </View>
        <View style={styles.selectedImagePostButton}>
          {
            image &&
              <Pressable
                onPress={() => {
                  // setSelectedImagePostUrl(image);
                }}
              >
                <Image
                  style={styles.selectedImage}
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