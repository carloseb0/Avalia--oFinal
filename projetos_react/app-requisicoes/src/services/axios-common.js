import axios from "axios";
export default axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-type": "application/json",
    "x-auth-token" : sessionStorage.getItem('token')
  },
});
