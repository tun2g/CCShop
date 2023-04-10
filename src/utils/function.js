import axios from "axios";
const privateEmail=(email)=>{

    let [username, domain] = email.split("@"); // tách thành username và domain
    let hidden = '*'.repeat(username.length-4) 
    let newUsername = username.slice(0, 2) + hidden + username.slice(-2); // thay đổi username
    return  newUsername + "@" + domain;
}
const uploadFile = (imageInput,callback) => {
    const uploadData = new FormData();
    uploadData.append("file", imageInput, "file");
    axios
      .post(`${process.env.REACT_APP_SERVER_API_URI}/file/upload`, uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        callback(res)
      })
      .catch((err) => console.log(err));
  };

export {privateEmail,uploadFile}