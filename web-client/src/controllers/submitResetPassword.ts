import axios from "axios";
import { API } from "../config/api";

export const submitResetPassword = (userId: string, password: string, token: string) => {
  return new Promise((resolve, reject) => {
    axios.post(`${API}/users/reset-password`, {
      userId,
      newPassword: password,
      token
    })
    .then(response => {
      if (response.data === 'Invalid authentication.') reject(response.data)
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })
}