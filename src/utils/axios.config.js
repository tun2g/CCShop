import axios from 'axios';
import { getCookie, getResponseInvalidToken,setInRedis } from './service';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URI,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if(error.message==="Request failed with status code 403"){
          getResponseInvalidToken((newAccessToken)=>{
          setInRedis({value:newAccessToken,key:getCookie('email')})  
        })
    }
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;