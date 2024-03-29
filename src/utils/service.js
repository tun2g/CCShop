import axios from "./axios.config";
import { useState,useEffect } from "react";


// use Cookie for store Token 
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
}

// use Redis for store Token
const getInRedis=(callback)=>{
  axios.get(`${process.env.REACT_APP_SERVER_AUTH_URI}/redis/get`,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true,    
  })
  .then((response) => {
    callback(response.data.token)
  })
  .catch((error) => {
    console.error(error);
  });    
}
const setInRedis=(data)=>{
  axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/redis/set`,data,{
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    withCredentials: true,    
  })
  .then((response) => {

  })
  .catch((error) => {
    console.log(error);
  });    
}

// JWT 
const getResponseInvalidToken=(callback)=>{
  axios.get(`${process.env.REACT_APP_SERVER_AUTH_URI}/refresh/refresh`,{
    withCredentials: true,    
  })
  .then((response) => {
    callback(response.data)
  })
  .catch((error) => {
    console.log(error);
  }); 
}

// handle log out
const logOut=(e)=>{

  axios.get(`${process.env.REACT_APP_SERVER_AUTH_URI}/user/logout`,{
    withCredentials: true,    
  })
  .then((response) => {

  })
  .catch((error) => {
    console.log(error);
  }); 
}

// debounce
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export {getCookie,getResponseInvalidToken,getInRedis,setInRedis,logOut,useDebounce}
