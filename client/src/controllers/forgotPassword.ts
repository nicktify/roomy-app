import axios from "axios";
import { API } from "../config/environment/constants";

const forgotPassword = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${API}/users/forgot-password`, {
      email,
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(error => {
      reject(error);
    })
  })
}

export default forgotPassword;