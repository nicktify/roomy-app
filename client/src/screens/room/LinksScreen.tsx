// import React, { useContext, useState } from 'react';
// import { Text, TextInput, View } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import { principalColor } from '../../config/colors';
// import { Context } from '../../context/MainContext';

// const LinksScreen = () => {
//   const { selectedRoom, user } = useContext( Context );

//   const [ activeForm, setActiveForm ] = useState(false);
//   const [ linkName, setLinkName ] = useState('');

//   const userIsOwner = selectedRoom?.owners.includes(user!.id);
//   return (
//     <View>
//       {
//         userIsOwner &&
//           <Icon
//             style={{
//               position: 'absolute',
//               bottom: 0,
//               right: 0,
//               margin: 15,
//               backgroundColor: principalColor,
//               borderRadius: 50,
//             }}
//             name="add"
//             color='white'
//             size={40}
//             onPress={() => setActiveForm(true)}
//           />
//       }
//             {
//         activeForm &&
//                 <View style={style.form}>
//                 <KeyboardAwareScrollView style={{flex: 1, width: '100%', height: '100%'}}>
//                   <View style={{ width: '100%', alignItems: 'center', marginTop: 20}}>
//                     <Text style={{ fontSize: 30, fontWeight: 'bold' , opacity: 0.8 }}>Add new post</Text>
//                   </View>
//                 <TextInput
//                   multiline
//                   placeholder="What's new?"
//                   autoCorrect={false}
//                   style={{
//                     color: 'black',
//                     fontSize: 18,
//                     marginTop: 20,
//                     borderRadius: 10,
//                     borderColor: '#f1f1f1',
//                     borderWidth: 2,
//                     width: '100%',
//                     opacity: 0.8,
//                   }}
//                   onChangeText={bodyPost => setBodyPost(bodyPost)}
//                   defaultValue={bodyPost}
//                   value={bodyPost}
//                 />
//                 {
//                   bodyPostFormError.length > 0 &&
//                     <Text style={{color: 'red'}}>{bodyPostFormError}</Text>
//                 }
//                 <View style={{width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', marginTop: 10,}}>
//                   {
//                     imageUri &&
//                     <Image 
//                       style={{ width: 100, height: 100, borderRadius: 5, }}
//                       source={{
//                         uri: imageUri.uri
//                       }}
//                       width={100}
//                       height={100}
//                     />
//                   }
//                   <TouchableOpacity
//                     style={style.uploadImageButton}
//                     onPress={() => setModalPictureVisible(true)}
//                   >
//                     <Text style={style.uploadImageButtonText}>Upload image</Text>
//                   </TouchableOpacity>
//                 </View>
//                 <View style={style.buttonsFormContainer}>
//                   <Pressable
//                     style={{
//                       backgroundColor: principalColor,
//                       borderRadius: 30,
//                       width: 150,
//                       padding: 10,
//                       alignItems: 'center',
//                       opacity: disabledPublishPostButton ? 0.5 : 1,
//                     }}
//                     onPress={handlePublish}
//                   >
//                     <Text style={style.cancelFormText}>Publish</Text>
//                   </Pressable>
//                   <TouchableOpacity
//                     style={style.cancelFormButton}
//                     onPress={() => {
//                       setActiveForm(false)
//                       setImageUri(undefined);
//                       setBodyPost('');
//                       setBodyPostFormError('')
//                     }}
//                   >
//                     <Text style={style.cancelFormText}>Cancel</Text>
//                   </TouchableOpacity>
//                 </View>
//             </KeyboardAwareScrollView>
//               </View>

//       }
//     </View>
//   );
// };

// export default LinksScreen;