import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../SocketService";
import ScrollbarComponent from "../Helpers/ScrollbarComponent";
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

function Chat(props) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.emit("joinRoom", "aaa");

    socket.on("message", (message) => {
      console.log("con");
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off("message");
      socket.emit("leaveRoom", "aaa");
    };
  }, [socket]);

  const handleMessageSubmit = () => {
    socket.emit("message", input);
    setInput("");
  };

  return (
    <div style={{position:"fixed",right:0,bottom:0,width:"400px"}}>
      <MDBContainer style={{width:"100%"}}>
        <MDBRow className="d-flex justify-content-center">
          <MDBCol md="12" lg="12" xl="12">
            <MDBCard id="chat2" style={{ borderRadius: "5px" }}>
              <MDBCardHeader className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{props.user.username}</h5>
                <btn className="btn btn-primary" size="sm" rippleColor="dark" onClick={()=>props.changeChat(false)}>
                  X
                </btn>
              </MDBCardHeader>
              <MDBCardBody>
                <ScrollbarComponent>
                  <div className="d-flex flex-row justify-content-end mb-4">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                        That's awesome!
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                        I will meet you Sandon Square sharp at 10 AM
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                        Is that okay?
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:09
                      </p>
                    </div>
                    <img
                      src={props.user.avatar}
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" ,borderRadius:"50%",}}
                    />
                  </div>

                  {messages.map((message, index) => {
                    return (
                      <div
                        className="d-flex flex-row justify-content-start mb-4"
                        key={index}
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                          alt="avatar 1"
                          style={{ width: "45px", height: "100%" }}
                        />
                        <div>
                          <p
                            className="small p-2 ms-3 mb-1 rounded-3"
                            style={{ backgroundColor: "#f5f6f7" }}
                          >
                            {message}
                          </p>
                          <p className="small ms-3 mb-3 rounded-3 text-muted">
                            00:11
                          </p>
                        </div>
                      </div>
                    );
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
                <a className="ms-3" onClick={handleMessageSubmit}>
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
