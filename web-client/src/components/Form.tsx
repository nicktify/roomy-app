import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { principalColor } from "../config/colors";
import { submitResetPassword } from "../controllers/submitResetPassword";
import { passwordValidation } from "../validations/passwordValidation";
import PasswordChangedSuccess from "./PasswordChangedSuccess";
import { Button } from './styledComponents';

interface Params {
  userId: string;
}

const Form  = () => {

  const {userId} = useParams<Params>()
  const [input, setInput] = useState({
    password: '',
    repeatedPassword: '',
  })
  const [errors, setErrors] = useState(passwordValidation(input.password, input.repeatedPassword));
  const [showError, setShowError] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {}, [input, errors])

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      password: e.target.value
    })
    setErrors(passwordValidation(input.password, input.repeatedPassword));
    setShowError(false)
  }

  const handleRepeatedPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      repeatedPassword: e.target.value
    })
    setErrors(passwordValidation(input.password, input.repeatedPassword));
    setShowError(false)
  }

  const handleSubmit = () => {
    if (errors.password.length > 0 || errors.password.length > 0) {
      setShowError(true);
      return;
    }
    submitResetPassword(userId, input.password)
    .then(result => {
      if (result === 'Password changed successfuly.') {
        setPasswordChanged(true);
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  if (passwordChanged) return (
    <PasswordChangedSuccess />
  )

  return (
    <div
      style={{
        backgroundColor: principalColor,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          width: '600px',
          boxShadow: '10px 5px 5px black',
          borderWidth: '5px',
          borderColor: 'black',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 40,
        }}
      >
        <p
          style={{
            fontSize: '40px',
            fontWeight: 'bold',
          }}
        >
          Reset password
        </p>
        <div
          style={{
            marginTop: 40,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <label 
              htmlFor="password"
              style={{
                fontSize: 19,
                marginBottom: 5,
              }}
            >
              Password
            </label>
            <input 
              name='password'
              type="password"
              onChange={handlePasswordChange}
              value={input.password}
              style={{
                padding: 10,
                borderRadius: 30,
                borderStyle: 'none',
                fontSize: 20,
                width: 300,
                color: 'black'
              }}
            />
            {
              showError && 
                <div
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    maxWidth: 300,
                  }}
                >
                  {errors.password}
                </div>
            }
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 20,
            }}
          >
            <label 
              htmlFor="repeat-password"
              style={{
                fontSize: 19,
                marginBottom:5,
              }}
            >
              Repeat password
            </label>
            <input 
              name='repeatedPassword'
              type="password"
              onChange={handleRepeatedPasswordChange}
              value={input.repeatedPassword}
              style={{
                padding: 10,
                borderRadius: 30,
                borderStyle: 'none',
                fontSize: 20,
                width: 300,
                color: 'black',
              }}
            />
            {
              showError && 
                <div
                  style={{
                    color: 'white',
                    fontStyle: 'italic',
                    maxWidth: 300
                  }}
                >
                  {errors.passwordMatch}
                </div>
            }
          </div>
        </div>
        <Button
          onClick={handleSubmit}
        >
          Reset password
        </Button>
      </div>
    </div>
  );
};

export default Form;