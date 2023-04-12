import { useState } from "react";

const Message = (props) => {
  const [hover, setHover] = useState(false);
  return (
    <div>
      {props.message.sender !== props.id ? (
        <div
          className="d-flex flex-row justify-content-start mb-3"
          key={props.index}
        >
          {props.message.sender !== props.arr[props.index + 1]?.sender ? (
            <img
              src={props.recAvatar}
              alt="avatar 1"
              style={{
                width: "45px",
                height: "100%",
                borderRadius: "50%",
              }}
            />
          ) : (
            <div style={{ width: "45px", height: "100%" }}></div>
          )}
          <div>
            <p
              className="small p-2 ms-3 mb-1 rounded-3"
              style={{ backgroundColor: "#f5f6f7", position: "relative" }}
              onMouseOver={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              {props.message.message}
              {hover && (
                <div
                  style={timeStyle}
                >
                  {props.message.time}
                </div>
              )}
            </p>
            {props.index + 1 === props.arr.length && (
              <p className="small ms-3 mb-3 rounded-3 text-muted">
                {props.message.time}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div
          className="d-flex flex-row justify-content-end m1-4 mb-3"
          key={props.index}
        >
          <div>
            <p
              className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary"
              style={{ position: "relative" }}
              onMouseOver={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              {props.message.message}
              {hover && (
                <div
                  style={timeStyle}
                >
                  {props.message.time}
                </div>
              )}
            </p>
            {props.index + 1 === props.arr.length && (
              <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                {props.message.time}
              </p>
            )}
          </div>
          {props.message.sender !== props.arr[props.index + 1]?.sender ? (
            <img
              src={props.avatar}
              alt="avatar 1"
              style={{
                width: "45px",
                height: "100%",
                borderRadius: "50%",
              }}
            />
          ) : (
            <div style={{ width: "45px", height: "100%" }}></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Message;

const timeStyle={
    backgroundColor: "black",
    padding: "3px",
    position: "absolute",
    color: "white",
    zIndex:10,
    borderRadius:"2px"
  }