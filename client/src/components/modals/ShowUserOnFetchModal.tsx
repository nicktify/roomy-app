import React, { useContext } from 'react';
import { Dimensions, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { Context } from '../../context/MainContext';
import Background from '../Background';
import SocialMediaIcon from '../SocialMediaIcon';
import styles from '../../styles/modals/showUserOnFetch';

const windowWidth = Dimensions.get('window').width;

const ShowUserOnFetchModal = ({
  showProfilePreview,
  setShowProfilePreview,
  handleSocialMediaPress,
  handleAddUserToRoom
}: any) => {
  const { selectedRoom, searchedUser } = useContext(Context);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showProfilePreview !== null}
      onRequestClose={() => {
        setShowProfilePreview(null);
      }}
    >
      <Background />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.profileImageContainer}>

            {showProfilePreview
              && showProfilePreview.profileBackground
              && showProfilePreview.profileBackground.length > 0
              && <Image
                    style={styles.profileBackground}
                    source={{ uri: showProfilePreview.profileBackground }}
                    width={windowWidth * 0.9}
                    height={150}
                  />
              }
            {showProfilePreview
              && showProfilePreview.profilePicture
              && showProfilePreview.profilePicture.length > 0
                ? <Image
                    style={styles.profilePicture}
                    source={{ uri: showProfilePreview && showProfilePreview.profilePicture ? showProfilePreview.profilePicture : undefined }}
                    width={80}
                    height={80}
                  />
                  :
                  <TouchableOpacity style={styles.touchableOpacity}></TouchableOpacity>
              }
          </View>
          <View style={styles.socialMediaContainer}>
            {showProfilePreview
              && showProfilePreview.socialMediaLinks
              && showProfilePreview.socialMediaLinks.facebook
              && <TouchableOpacity
                    style={{
                      marginHorizontal: 15
                    }}
                    onPress={() => handleSocialMediaPress('facebook')}
                  >
                    <SocialMediaIcon name='facebook' size={30} />
                  </TouchableOpacity>
              }
            {showProfilePreview
              && showProfilePreview.socialMediaLinks
              && showProfilePreview.socialMediaLinks.twitter
              && <TouchableOpacity
                    style={{
                      marginHorizontal: 15
                    }}
                    onPress={() => handleSocialMediaPress('twitter')}
                  >
                    <SocialMediaIcon name='twitter' size={30} />
                  </TouchableOpacity>
              }
            {showProfilePreview
              && showProfilePreview.socialMediaLinks
              && showProfilePreview.socialMediaLinks.instagram
              && <TouchableOpacity
                    style={{
                      marginHorizontal: 15
                    }}
                    onPress={() => handleSocialMediaPress('instagram')}
                  >
                    <SocialMediaIcon name='instagram' size={30} />
                  </TouchableOpacity>
              }
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.aboutText}>{showProfilePreview?.about}</Text>
          </View>
            {searchedUser
              && selectedRoom
              && (selectedRoom.owners.includes(searchedUser.id) || selectedRoom.participants.includes(searchedUser.id))
                ? <View style={styles.actionContainer}>
                    <Text style={styles.userOnRoomText}>User already exist in this room.</Text>
                  </View>
                  :
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleAddUserToRoom}
                  >
                    <Text style={styles.addText}>Add</Text>
                  </TouchableOpacity>
                }
        </View>
      </View>
    </Modal>
  );
};

export default ShowUserOnFetchModal;
