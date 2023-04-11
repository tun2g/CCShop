import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../SocketService";
import ScrollbarComponent from "../../../components/Helpers/ScrollbarComponent";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useSelector } from "react-redux";
import {selectId,selectAvatar,selectName} from "../../../ReduxService/UserSlice"
import axios from "axios";
function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = useContext(SocketContext);
  const id=useSelector(selectId)
  const avatar=useSelector(selectAvatar)
  const name=useSelector(selectName)

  useEffect(() => {
    
    const chatRoom=props.user._id<id?
                  `${props.user._id}${id}`
                  :`${id}${props.user._id}`

    socket.emit("joinRoom", chatRoom);

    axios.post(`${process.env.REACT_APP_SERVER_AUTH_URI}/redis/redis-get`,{key:chatRoom})
    .then(data=>{
        setMessages(JSON.parse(data.data.value))
      })
    .catch(err=>{
      console.log(err)
    })
    

    socket.on("message", (data) => {
      setMessages(data.listMessages);
    });

    return () => {
      socket.off("message");
      socket.emit("leaveRoom", chatRoom);
    };
  }, [socket]);

  const handleMessageSubmit = () => {
    socket.emit("message", {message:input,sender:id,receiver:props.user._id,type:"message"});
    socket.emit("notifyMessage",{receiver:props.user._id,sender:id,name:name,avatar,type:"message"})
    setInput("");
  };

  return (
    <div style={{position:"fixed",right:0,bottom:0,width:"400px"}}>
      <MDBContainer style={{width:"100%"}}>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="12" lg="12" xl="12">
            <MDBCard id="chat2" style={{ borderRadius: "5px" }}>
              <MDBCardHeader className="d-flex justify-content-between align-items-center">
                <div style={{display:"flex",flexDirection:"row"}}>
                <img src={props.user.avatar} style={{width:"30px",borderRadius:"50%",marginRight:"5px"}}></img>
                <h5 className="mb-0">{props.user.username}</h5>
                </div>
                <button className="btn btn-primary" size="sm" rippleColor="dark" onClick={()=>props.changeChat(false)}>
                  X
                </button>
              </MDBCardHeader>
              <MDBCardBody>
                <ScrollbarComponent>

                  {messages?.map((message, index) => {
                    if(message.sender!==id)
                    return (
                      <div
                        className="d-flex flex-row justify-content-start mb-4"
                        key={index}
                      >
                        <img
                          src={props.user.avatar}
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        />
                        <div>
                          <p
                            className="small p-2 ms-3 mb-1 rounded-3"
                            style={{ backgroundColor: "#f5f6f7" }}
                          >
                            {message.message}
                          </p>
                          <p className="small ms-3 mb-3 rounded-3 text-muted">
                            00:11
                          </p>
                        </div>
                      </div>
                    )
                    else return(
                  <div className="d-flex flex-row justify-content-end mb-4">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                        {message.message}
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:09
                      </p>
                    </div>
                    <img
                      src={avatar}
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" ,borderRadius:"50%",}}
                    />
                  </div>
                    )
                  })}
                </ScrollbarComponent>
              </MDBCardBody>
              <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="exampleFormControlInput1"
                  value={input}
                  placeholder="Type message"
                  onChange={(e) => setInput(e.target.value)}
                ></input>
                <a className="ms-1 text-muted" href="#!">
                  <MDBIcon fas icon="paperclip" />
                </a>
                <a className="ms-3 text-muted" href="#!">
                  <MDBIcon fas icon="smile" />
                </a>
                <a className="ms-3" onClick={handleMessageSubmit} style={{cursor:"pointer"}}>
                  <MDBIcon fas icon="paper-plane" />
                </a>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

export default Chat;
