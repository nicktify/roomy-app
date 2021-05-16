import React from 'react';
import { Dimensions, Image, Modal, Pressable, Text, View } from 'react-native';
import { principalColor } from '../../config/colors';
import SocialMediaIcon from '../SocialMediaIcon';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ShowUserOnFetchModal = ({showProfilePreview, setShowProfilePreview, handleSocialMediaPress, handleAddUserToRoom}: any) => {
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
                    <Pressable
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
                    </Pressable>
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
                  <Pressable
                    style={{
                      marginHorizontal: 15
                    }}
                    onPress={() => handleSocialMediaPress('facebook')}
                  >
                    <SocialMediaIcon name='facebook' size={30} />
                  </Pressable>
                }
                {
                  showProfilePreview && showProfilePreview.socialMediaLinks && showProfilePreview.socialMediaLinks.twitter &&
                  <Pressable
                    style={{
                      marginHorizontal: 15
                    }}
                    onPress={() => handleSocialMediaPress('twitter')}
                  >
                    <SocialMediaIcon name='twitter' size={30} />
                  </Pressable>
                }
                {
                  showProfilePreview && showProfilePreview.socialMediaLinks && showProfilePreview.socialMediaLinks.instagram &&
                  <Pressable
                    style={{
                      marginHorizontal: 15
                    }}
                    onPress={() => handleSocialMediaPress('instagram')}
                  >
                    <SocialMediaIcon name='instagram' size={30} />
                  </Pressable>
                }
              </View>
              <View
                style={{
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ color: 'black' }}>{showProfilePreview?.about}</Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: principalColor,
                  width: 100,
                  borderRadius: 40,
                  padding: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  position: 'absolute',
                  bottom: 0,
                  marginBottom: 20,
                }}
                onPress={handleAddUserToRoom}
              >
                <Text style={{ color: 'white', fontSize: 20 }}>Add</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
  )
}

export default ShowUserOnFetchModal;