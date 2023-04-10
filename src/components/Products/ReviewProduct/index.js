import {  useState, useEffect } from "react";
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBIcon,
  MDBInput,
  MDBCardImage,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  selectId,
  selectAvatar,
  selectName,
} from "../../../ReduxService/UserSlice";
import RatingStar from "../RatingStar";
import { useDebounce } from "../../../utils/service";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../../SocketService";
import { useContext } from "react";
const ReviewProduct = (props) => {
  const userid = useSelector(selectId);
  const avatar = useSelector(selectAvatar);
  const name = useSelector(selectName);

  const navigate=useNavigate()
  // content review input
  const [comment, setComment] = useState("");

  //render existed commets
  const [listComments, setlist] = useState([]);

  // handle new comment => useSelect
  const [newComments, setNewComment] = useState(false);

  //feedback
  const [feedback, setFeedback] = useState();

  const [feedbackContent, setFeedbackContent] = useState("");

  const bounce = useDebounce(props.rating, 1000);
  const socket = useContext(SocketContext);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_API_URI}/review/get/${props.keyProduct}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((c) => {
        setlist(c.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [bounce, newComments]);

  const handleFeedback = (id) => {
    if (feedbackContent !== "") {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_API_URI}/review/update/${props.product._id}`,
          {
            avatarshop: avatar,
            feedback: feedbackContent,
            shopname: name,
            userid: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setFeedbackContent("");
          setNewComment(!newComments);
        })
        .catch((err) => {
          console.log(err);
        });
      socket.emit("notifyMessage", {
        sender: userid, // shop
        name,
        receiver: id, // user's comment
        type: "feedback",
        avatar,
        product: props.product._id,
      });
    }
  };
  const handleReview = () => {
    if (props.rating !== 0) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_API_URI}/review/${props.product._id}`,
          {
            productid: props.product._id,
            userid,
            rating:props.rating,
            comment,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          props.changeRating(0);
          setComment("");
          setNewComment(!newComments);
        })
        .catch((err) => {
          console.log(err);
        });
      if (props.rating === 5) {
        axios
          .post(
            `${process.env.REACT_APP_SERVER_API_URI}/product/update`,
            { rating: props.product?.rating + 1, _id: props.product._id },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      socket.emit("notifyMessage", {
        sender: userid,
        name,
        receiver: props.product.shopid,
        type: "comment",
        avatar,
        product: props.product._id,
      });
    }
  };
  return (
    <>
      <MDBContainer
        className="mt-3 border rounded-3"
        style={{ backgroundColor: "white" }}
      >
        {props.product?.shopid !== userid && (
          <>
            <h3 className="mt-3">Đánh giá sản phẩm</h3>
            <div className="col-2 mt-3">
              <RatingStar rating={props.rating} changeRating={props.changeRating} />
            </div>

            <div className="mt-3">
              <MDBInput
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></MDBInput>
            </div>
            <div className="mt-3 ">
              <button className="btn btn-primary" onClick={handleReview}>
                Đánh giá
              </button>
            </div>
          </>
        )}

        <div className="mt-3 col-10">
          <h5>Dánh sách đánh giá</h5>
          <MDBRow className="p-1">
            <MDBCol>
              {listComments?.map((comment, index) => {
                return (
                  <MDBCard key={comment._id} className="p-1 mt-2">
                    <MDBRow>
                      <MDBCol>
                        <MDBRow>
                          <MDBCol className="col-1">
                            <MDBCardImage
                              src={comment.userid.avatar}
                              className="w-100 border"
                              style={{ borderRadius: "50%", cursor: "pointer" }}
                              onClick={() => {
                                userid === comment.userid._id
                                  ? navigate("/profile")
                                  : navigate(
                                      `/profile-other?key=${comment.userid._id}`
                                    );
                                window.scrollTo(0, 0);
                              }}
                            />
                          </MDBCol>
                          <MDBCol className="col-7">
                            <MDBRow style={{ fontWeight: "bold" }}>
                              {comment.userid.username}
                            </MDBRow>
                            <MDBRow style={{ color: "red" }}>
                              <MDBCol>
                                {[...Array(comment?.rating)]?.map(
                                  (_i, index) => {
                                    return (
                                      <MDBIcon
                                        fas
                                        icon="star"
                                        key={index}
                                      ></MDBIcon>
                                    );
                                  }
                                )}
                              </MDBCol>
                            </MDBRow>
                          </MDBCol>
                        </MDBRow>
                        <MDBRow>
                          <MDBCol
                            className="col-1"
                            style={{ color: "red" }}
                          ></MDBCol>
                          <MDBCol className="col-7 min-w-100">
                            {comment.comment}
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                      <MDBCol className="col-1">
                        <MDBIcon fas icon="heart" className="mt-3" />

                        {/* Shop */}
                        {props.product.shopid === userid &&
                          !comment.feedback && (
                            <div
                              className="mt-3"
                              style={{ cursor: "pointer", color: "blue" }}
                              onClick={() => setFeedback(index)}
                            >
                              Phản hồi
                            </div>
                          )}
                      </MDBCol>
                    </MDBRow>

                    {/* Shop and User */}
                    {comment.feedback && (
                      <MDBRow className="mt-4">
                        <MDBCol className="col-1"></MDBCol>
                        <MDBCol
                          className="col-10"
                          style={{
                            border: "0.1px solid #eee",
                            borderRadius: "3px",
                          }}
                        >
                          <MDBRow>
                            <MDBCol className="col-1">
                              <MDBCardImage
                                src={comment.avatarshop}
                                width="60px"
                                style={{ borderRadius: "50%" }}
                              />
                            </MDBCol>
                            <MDBCol className="col-10">
                              <MDBRow style={{ fontWeight: "bold" }}>
                                {comment.shopname}
                              </MDBRow>
                              <MDBRow>{comment.feedback}</MDBRow>
                            </MDBCol>
                          </MDBRow>
                        </MDBCol>
                      </MDBRow>
                    )}
                    {props.product.shopid === userid && index === feedback && (
                      <MDBRow className="mt-4">
                        <MDBCol className="col-1"></MDBCol>
                        <MDBCol className="col-10">
                          <MDBInput
                            value={feedbackContent}
                            onChange={(e) => setFeedbackContent(e.target.value)}
                          ></MDBInput>
                        </MDBCol>
                        <MDBCol className="col-1">
                          <button
                            className="btn btn-primary"
                            style={{ padding: "3px 10px" }}
                            onClick={() => handleFeedback(comment.userid._id)}
                          >
                            gửi
                          </button>
                        </MDBCol>
                      </MDBRow>
                    )}
                  </MDBCard>
                );
              })}
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
    </>
  );
};

export default ReviewProduct;
