import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import forgotPassword from '../../controllers/forgotPassword';
import { isEmailValidation } from '../../validations/isEmailValidation';
import styles from '../../styles/screens/forgotPassword';
import EmailSentModal from '../../components/modals/EmailSentModal';


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
    <View style={styles.container}>
      <Text style={styles.title}>
        Reset password
      </Text>
      <View>
        <Text  style={styles.inputLabel}>
          Enter your email:
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="example@gmail.com"
          placeholderTextColor="#9a9b9c"
          onChangeText={email => onChange(email)}
          defaultValue={email}
          value={email}
          keyboardType='email-address'
        />
        {
          showError && 
          <Text style={styles.errorText}>
            {error.email}
          </Text>
        }
        <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
          <Text style={styles.continueButtonText}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
      <EmailSentModal 
        showEmailSentModal={showEmailSentModal}
        setShowEmailSentModal={setShowEmailSentModal}
      />
    </View>
  );
};

export default ForgotPasswordScreen;