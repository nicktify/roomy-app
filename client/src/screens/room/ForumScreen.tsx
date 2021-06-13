import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, Image, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { principalColor } from '../../config/colors';
import { Context } from '../../context/MainContext';
import { ForumPost } from '../../types/ForumPost';
import style from '../../styles/screens/roomPostScreen';
import PostOptionModal from '../../components/modals/PostOptionModal';
import ImagePostPreviewModal from '../../components/modals/ImagePostPreviewModal';
import styles from '../../styles/screens/room/forumScreen'

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
    <View style={styles.itemContainer}>
      <View style={styles.itemInnerContainer}>
        <View style={styles.itemTopContainer}>
          <View style={styles.itemAuthorInfoContainer}>
            {
              item.authorProfilePicture ?
                <Image
                  source={{ uri: item.authorProfilePicture }}
                  style={styles.itemAuthorProfileImage}
                />
                :
                <Icon
                  style={styles.itemAuthorProfileImage}
                  name="account-circle"
                  size={50}
                  color={principalColor}
                />
            }
            <View style={style.authorNameContainer}>
              <Text style={style.authorNameText}>{item.authorName}</Text>
            </View>
          </View>
          <View style={styles.itemMoreVertIconContainer}>
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
        <View style={styles.itemImageContainer}>
          {
            item.image &&
              <Pressable onPress={() => { setSelectedImagePostUrl(item.image) }}>
                <Image
                  style={styles.itemImage}
                  source={{ uri: item.image }}
                  width={350}
                  height={350}
                />
              </Pressable>
          }
        </View>
        <View>
          {
            item.latestComment &&
            <View  style={styles.itemLatestCommentContainer}>
              <View style={styles.itemLatestCommentAuthorContainer}>
                {
                  item.latestComment.authorProfilePicture ?
                  <Image 
                    style={styles.itemLatestCommentAuthorPicture}
                    source={{ uri: item.latestComment.authorProfilePicture }}
                  />
                  :
                  <Icon
                    name="account-circle"
                    size={35}
                    color={principalColor}
                    style={styles.itemLatestCommentIcon}
                  />
                }
                <Text style={styles.itemLatestCommentAuthorName}>
                  {item.latestComment.authorName}
                </Text>
              </View>
              <View>
                <Text style={styles.itemLatestCommentBody}>
                  {item.latestComment.body}
                </Text>
              </View>
            </View>
          }
        </View>
        <View style={styles.itemButtonsContainer}>
          <TouchableOpacity
            style={styles.itemAddCommentButton}
            onPress={() => navigation.navigate('NewForumPostCommentForm', {
              ...item
            })}
          >
            <Text style={styles.itemAddCommentButtonText}>
              ADD COMMENT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={styles.itemMoreButton}
              onPress={() => navigation.navigate('ForumPostInformation', {
                ...item,
              })}
            >
              <Text style={styles.itemMoreButtonText}>
                MORE
              </Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={selectedRoomForumPosts}
        renderItem={renderItem}
        keyExtractor={item => `${item.body}${item.date}`}
        ListFooterComponent={<View style={{ width: '100%', height: 60 }}></View>}
        ListHeaderComponent={<View style={{ width: '100%', height: 20 }}></View>}
      />
      <Icon
        style={styles.icon}
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