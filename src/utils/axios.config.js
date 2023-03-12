import axios from 'axios';
import { getCookie, getResponseInvalidToken,setInRedis } from './service';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URI,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if(error.message==="Request failed with status code 403"){
          getResponseInvalidToken((data)=>{
          setInRedis({value:data.accessToken})  
        })
    }
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;