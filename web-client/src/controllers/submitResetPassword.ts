import axios from "axios";
import { API } from "../config/environment/api";

export const submitResetPassword = (userId: string,password: string) => {
  return new Promise((resolve, reject) => {
    axios.post(`${API}/users/reset-password`, {
      userId,
      newPassword: password
    })
    .then(response => {
      resolve(response.data)
    })
    .catch(error => {
      reject(error)
    })
  })
}