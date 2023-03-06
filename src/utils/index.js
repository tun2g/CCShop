import axios from "axios";


// use Cooke for store Token 
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
}

// use Redis for store Token
const getInRedis=(data,callback)=>{
  axios.post(`${process.env.REACT_APP_SERVER_API_URI}/redis/get`,data)
  .then((response) => {
    callback(response.data.token)
  })
  .catch((error) => {
    console.error(error);
  });    
}
const setInRedis=(data)=>{
  axios.post(`${process.env.REACT_APP_SERVER_API_URI}/redis/set`,data)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error);
  });    
}

// JWT 
const getResponseInvalidToken=()=>{
  axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/refresh`)
  .then((response) => {
    console.log(response)
  })
  .catch((error) => {
    console.error(error);
  }); 
}
export {getCookie,getResponseInvalidToken,getInRedis,setInRedis}