import React, { useState } from 'react';
import { Dimensions, Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TransparentBackground from '../components/TransparentBackground';
import { principalColor } from '../config/colors';
import forgotPassword from '../controllers/forgotPassword';
import { isEmailValidation } from '../validations/isEmailValidation';

const windowWidth = Dimensions.get('window').width;

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(isEmailValidation(email));
  const [showError, setShowError] = useState(false);
  const [showEmailSentModal, setShowEmailSentModal] = useState(false);

  const onChange = (email: string) => {
    setShowError(false)
    setError(isEmailValidation(email))
    setEmail(email);
  }

  const handleSubmit = () => {
    console.log(error)
    if (error.email.length > 0) {
      setShowError(true);
      return
    }
    setShowError(false)
    forgotPassword(email.toLowerCase())
    .then(result => {
      console.log(result)
      if (result === 'Email sent.') {
        setShowEmailSentModal(true);
      }
      setShowError(false);
    })
    .catch(error => {
      console.log(error)
      setShowError(false);
    });
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}
    >
      <Text
       style={{
        color: '#69C1AC',
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 15,
       }}
      >
        Reset password
      </Text>
      <View>
        <Text 
          style={{
            marginBottom: 10,
            fontSize: 20,
            opacity: 0.6,
          }}
        >
          Enter your email:
        </Text>
        <TextInput
          style={{
            fontSize: 18,
            width: 200,
            color: 'black',
            backgroundColor: '#E8E8E8',
            padding: 15,
            borderRadius: 10,
            minWidth: '80%',
            marginBottom: 10,
          }}
          placeholder="example@gmail.com"
          placeholderTextColor="#9a9b9c"
          onChangeText={email => onChange(email)}
          defaultValue={email}
          value={email}
          keyboardType='email-address'
        />
        {
          showError && 
          <Text
            style={{
              color: 'red',
              fontStyle: 'italic',
            }}
          >
            {error.email}
          </Text>
        }
        <TouchableOpacity
          style={{
            backgroundColor: principalColor,
            marginTop: 20,
            borderRadius: 20,
            height: 55,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleSubmit}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={showEmailSentModal}
        transparent
        onRequestClose={() => setShowEmailSentModal(false)}
      >
        <TransparentBackground />
        <View
          style={{
            flex: 1,
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              backgroundColor: 'white',
              width: windowWidth * 0.8,
              alignSelf: 'center',
              borderRadius: 20,
              padding: 20,
            }}
          >
            <Text
              style={{
                opacity: 0.9,
              }}
            >
              Email sent. Please check your inbox.
            </Text>
            <Pressable
              style={{
                backgroundColor: principalColor,
                alignSelf: 'center',
                paddingVertical: 5,
                paddingHorizontal: 20,
                borderRadius: 20,
                marginTop: 10,
              }}
              onPress={() => setShowEmailSentModal(!showEmailSentModal)}
            >
              <Text
                style={{
                  color: 'white',
                }}
              >
                OK
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ForgotPasswordScreen;