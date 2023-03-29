const privateEmail=(email)=>{

    let [username, domain] = email.split("@"); // tách thành username và domain
    let hidden = '*'.repeat(username.length-4) 
    let newUsername = username.slice(0, 2) + hidden + username.slice(-2); // thay đổi username
    return  newUsername + "@" + domain;
}


export {privateEmail}