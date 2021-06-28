import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { submitResetPassword } from "../controllers/submitResetPassword";
import { passwordValidation } from "../validations/passwordValidation";
import PasswordChangedSuccess from "./PasswordChangedSuccess";
import styles from '../styles/Form.module.css';

interface Params {
  userId: string;
  token: string;
}

const Form  = () => {
  const {userId, token} = useParams<Params>()
  const [input, setInput] = useState({
    password: '',
    repeatedPassword: '',
  })
  
  const [errors, setErrors] = useState(passwordValidation(input.password, input.repeatedPassword));
  const [showError, setShowError] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {setErrors(passwordValidation(input.password, input.repeatedPassword))}, [input])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      password: e.target.value
    })
    setShowError(false)
  }

  const handleRepeatedPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      repeatedPassword: e.target.value
    })
    setShowError(false)
  }

  const handleSubmit = () => {
    if (errors.password.length > 0 || errors.passwordMatch.length > 0) {
      setShowError(true);
      return;
    }
    submitResetPassword(userId, input.password, token)
    .then(result => {
      if (result === 'Password changed successfuly.') {
        setPasswordChanged(true);
      }
    })
    .catch(error => {
      alert(error);
    })
  }

  if (passwordChanged) return (
    <PasswordChangedSuccess />
  )

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className={styles.title}>Reset password</p>
        <div className={styles.inputContainer}>
          <div className={styles.inputWrapper}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input 
              name='password'
              type="password"
              onChange={handlePasswordChange}
              value={input.password}
              className={styles.input}
            />
            {
              showError &&
              <i className={styles.errorMessage}>{errors.password}</i>
            }
          </div>
          <div className={styles.inputWrapper}>
            <label htmlFor="repeat-password" className={styles.label}>Repeat password</label>
            <input 
              name='repeatedPassword'
              type="password"
              onChange={handleRepeatedPasswordChange}
              value={input.repeatedPassword}
              className={styles.input}
            />
            {
              showError && 
                <i className={styles.errorMessage}>{errors.passwordMatch}</i>
            }
          </div>
        </div>
        <button onClick={handleSubmit} className={styles.button}>Reset password</button>
      </div>
    </div>
  );
};

export default Form;

