import React, { useContext } from 'react';
import { Dimensions, Image, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { principalColor } from '../../config/colors';
import { Context } from '../../context/MainContext';
import SocialMediaIcon from '../SocialMediaIcon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ShowUserOnFetchModal = ({ showProfilePreview, setShowProfilePreview, handleSocialMediaPress, handleAddUserToRoom }: any) => {

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
      <View
        style={{ flex: 1, backgroundColor: 'black', opacity: 0.5, position: 'absolute', width: windowWidth, height: windowHeight }}
      >
      </View>
      <View style={{
        flex: 1,
        width: windowWidth,
        height: windowHeight,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View
          style={{
            backgroundColor: 'white',
            width: windowWidth * 0.9,
            height: windowHeight * 0.8,
          }}
        >
          <View
            style={{
              backgroundColor: '#a8a8a8a8',
              height: 150,
            }}
          >
            {
              showProfilePreview && showProfilePreview.profileBackground && showProfilePreview.profileBackground.length > 0 &&
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={{
                  uri: showProfilePreview.profileBackground
                }}
                width={windowWidth * 0.9}
                height={150}
              />
            }
            {
              showProfilePreview && showProfilePreview.profilePicture && showProfilePreview.profilePicture.length > 0 ?
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 50,
                    position: 'absolute',
                    bottom: -50,
                    alignSelf: 'center',
                  }}
                  source={{
                    uri: showProfilePreview && showProfilePreview.profilePicture ? showProfilePreview.profilePicture : undefined
                  }}
                  width={80}
                  height={80}
                />
                :
                <TouchableOpacity
                  style={{
                    width: 80,
                    backgroundColor: 'black',
                    height: 80,
                    borderRadius: 50,
                    position: 'absolute',
                    bottom: -50,
                    alignSelf: 'center',
                  }}
                >
                </TouchableOpacity>
            }
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 60
            }}
          >
            {
              showProfilePreview && showProfilePreview.socialMediaLinks && showProfilePreview.socialMediaLinks.facebook &&
              <TouchableOpacity
                style={{
                  marginHorizontal: 15
                }}
                onPress={() => handleSocialMediaPress('facebook')}
              >
                <SocialMediaIcon name='facebook' size={30} />
              </TouchableOpacity>
            }
            {
              showProfilePreview && showProfilePreview.socialMediaLinks && showProfilePreview.socialMediaLinks.twitter &&
              <TouchableOpacity
                style={{
                  marginHorizontal: 15
                }}
                onPress={() => handleSocialMediaPress('twitter')}
              >
                <SocialMediaIcon name='twitter' size={30} />
              </TouchableOpacity>
            }
            {
              showProfilePreview && showProfilePreview.socialMediaLinks && showProfilePreview.socialMediaLinks.instagram &&
              <TouchableOpacity
                style={{
                  marginHorizontal: 15
                }}
                onPress={() => handleSocialMediaPress('instagram')}
              >
                <SocialMediaIcon name='instagram' size={30} />
              </TouchableOpacity>
            }
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
            }}
          >
            <Text style={{ color: 'black' }}>{showProfilePreview?.about}</Text>
          </View>
          {
              searchedUser && selectedRoom && 
              (selectedRoom.owners.includes(searchedUser.id) || selectedRoom.participants.includes(searchedUser.id)) ?
              <View
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: principalColor,
                    borderRadius: 10,
                    width: windowWidth * 0.4,
                    paddingVertical: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.5,
                  }}
                >
                  <Text style={{ color: 'white' }}>Add</Text>
                </Pressable>
                <Text style={{color: 'red', fontStyle: 'italic'}}>User already exist in this room.</Text>
              </View>
                :
                <TouchableOpacity
                  style={{
                    backgroundColor: principalColor,
                    borderRadius: 10,
                    width: windowWidth * 0.4,
                    paddingVertical: 10,
                    alignSelf: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 20,
                  }}
                  onPress={handleAddUserToRoom}
                >
                  <Text style={{ color: 'white' }}>Add</Text>
                </TouchableOpacity>
            }
        </View>
      </View>
    </Modal>
  );
};

export default ShowUserOnFetchModal;