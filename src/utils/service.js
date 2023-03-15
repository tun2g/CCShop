import axios from "./axios.config";

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
    console.log(response)
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
    console.log("re/re",response)
    callback(response.data)
  })
  .catch((error) => {
    console.log(error);
  }); 
}

const logOut=(e)=>{
  e.preventDefault()
  axios.get(`${process.env.REACT_APP_SERVER_AUTH_URI}/user/logout`,{
    withCredentials: true,    
  })
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error);
  }); 
}
export {getCookie,getResponseInvalidToken,getInRedis,setInRedis,logOut}