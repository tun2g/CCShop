import { useMemo, memo, useState, useEffect } from "react";
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBInput,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectId,selectAvatar,selectName } from "../../../ReduxService/UserSlice";
import RatingStar from "../RatingStar";
import { useDebounce } from "../../../utils/service";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../../SocketService";
import { useContext } from "react";
import parse from 'html-react-parser'
function ProductDetail() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  //redux-toolkit 
  const userid = useSelector(selectId);
  const avatar = useSelector(selectAvatar)
  const name=useSelector(selectName)

  const navigate=useNavigate()

  let domParser = new DOMParser();
  
  const keyProduct = searchParams.get("key");

  const [product, setProduct] = useState();

  // quantity of product order
  const [quantity, setQuantity] = useState(1);
  
  // set rating input
  const [rating, setRating] = useState(0);
  
  // content review input
  const [comment, setComment] = useState("");
  
  //render existed commets
  const [listComments, setlist] = useState([]);
  
  // handle new comment => useSelect
  const [newComments, setNewComment] = useState(false);

  //feedback
  const [feedback,setFeedback]=useState()

  const [feedbackContent,setFeedbackContent]=useState('')

  const bounce = useDebounce(rating, 1000);

  const socket=useContext(SocketContext)

  const changeRating = (a) => {
    setRating(a);
  };
  function handleIncrement() {
    setQuantity(quantity + 1);
  }

  function handleDecrement() {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  }

  useEffect(() => {
    console.log("detail render");

    axios
      .get(
        `${process.env.REACT_APP_SERVER_API_URI}/product/get-product/${keyProduct}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((p) => {
        setProduct(p.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${process.env.REACT_APP_SERVER_API_URI}/review/get/${keyProduct}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((c) => {
        setlist(c.data);
      })
      .catch((err) => {
        console.log(err);
      });
      return ()=>{

      }
  }, [bounce, newComments]);

  const handleAddToCart = () => {
    axios
      .post(
        `${process.env.REACT_APP_SERVER_API_URI}/cart/add`,
        {
          userid,
          shopid: product.shopid,
          quantity,
          cost: quantity * product.price,
          size: product?.size,
          color: product?.color,
          productid: product._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFeedback=(id)=>{
    if(feedbackContent!==''){

      axios.post(`${process.env.REACT_APP_SERVER_API_URI}/review/update/${product._id}`,{
        avatarshop:avatar,
        feedback:feedbackContent,
        shopname:name,
        userid:id
      },{
        headers:{
          "Content-Type":"application/json"
        }
      })
      .then(res=>{
        setFeedbackContent('')
        setNewComment(!newComments)
      })
      .catch(err=>{
        console.log(err)
      })
      socket.emit("notifyMessage",{
        sender:userid,  // shop
        name,                 
        receiver:id, // user's comment
        type:"feedback",
        avatar,
        product:product._id
      })

    }
  }
  const handleReview = () => {
    if(rating !== 0){

      axios
        .post(
          `${process.env.REACT_APP_SERVER_API_URI}/review/${product._id}`,
          {
            productid: product._id,
            userid,
            rating,
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
          setRating(0);
          setComment("");
          setNewComment(!newComments);
        })
        .catch((err) => {
          console.log(err);
        });
        socket.emit("notifyMessage",{
          sender:userid,
          name,
          receiver:product.shopid,
          type:"comment",
          avatar,
          product:product._id
        })
    } 

  };
  return (
    <div style={{position:"relative"}}>
      <MDBContainer fluid>
        <MDBRow className="justify-content-center mb-3 mt-10">
          <MDBCol md="12" xl="10">
            <MDBCard className="shadow-0 border rounded-3">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                    <div className="bg-image hover-zoom">
                      <img src={product?.imageurl} className="w-100 rounded" />
                    </div>
                  </MDBCol>
                  <MDBCol md="6">
                    <h5>{product?.name}</h5>
                    <div className="d-flex flex-row">
                      <div className="text-danger mb-1 me-2">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                      </div>
                      <span>145</span>
                    </div>

                    <p className=" mt-5 mb-4 mb-md-0">{product?.introduction}</p>
                    <h4 className="mt-2 mb-1 me-1">{product?.price} đồng</h4>

                  </MDBCol>
                  <MDBCol
                    md="6"
                    lg="3"
                    className="border-sm-start-none border-start"
                  >
                    <div className="d-flex flex-column mt-4">
                      <div className="d-flex flex-row mt-4">
                        <div>Số lượng:</div>
                        <InputGroup>
                          <Button
                            variant="outline-secondary"
                            onClick={handleDecrement}
                          >
                            -
                          </Button>
                          <FormControl type="text" value={quantity} readOnly />
                          <Button
                            variant="outline-secondary"
                            onClick={handleIncrement}
                          >
                            +
                          </Button>
                        </InputGroup>
                      </div>

                      {product?.size ? (
                        <div>
                          <div className="d-flex flex-row mt-4">
                            <div>Kích thước:</div>
                            <InputGroup></InputGroup>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <button
                        className="btn btn-primary mt-4"
                        onClick={handleAddToCart}
                      >
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Chi tiết sản phẩm */}
      <div className="container mt-5 " style={{backgroundColor:"white"}}>
        <div className="row">
          <div className="col-10">
            <div className="row  border shadow-0 rounded-3 mt-3">
              <div id="description">
                {parse(product?.description?product.description:'')}
              </div>
            </div>

          </div>
          <div className="col-2">Quảng Cáo</div>
        </div>
      </div>

      {/*  */}

      {/* Đánh giá sản phẩm */}

       <MDBContainer className="mt-3 border rounded-3" style={{backgroundColor:"white"}}>
        {
        product?.shopid !== userid &&<>
          <h3 className="mt-3">Đánh giá sản phẩm</h3>
          <div className="col-2 mt-3">
            <RatingStar rating={rating} changeRating={changeRating} />
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
        </>}

        <div className="mt-3 col-10">
          <h5>Dánh sách đánh giá</h5>
          <MDBRow className="p-1">
            <MDBCol>
              {listComments?.map((comment,index) => {
                return (
                  <MDBCard key={comment._id} className="p-1 mt-2">
                    <MDBRow>
                      <MDBCol>
                        <MDBRow>
                          <MDBCol className="col-1">
                            <MDBCardImage
                              src={comment.userid.avatar}
                              className="w-100 border"
                              style={{ borderRadius: "50%",cursor:"pointer"}}
                              onClick={
                                  ()=>{
                                    userid===comment.userid._id?
                                    navigate('/profile')
                                    :
                                    navigate(`/profile-other?key=${comment.userid._id}`)
                                    window.scrollTo(0,0)
                                  }
                              }
                            />
                          </MDBCol>
                          <MDBCol className="col-7">
                            <MDBRow style={{fontWeight:"bold"}}>{comment.userid.username}</MDBRow>
                            <MDBRow style={{ color: "red" }}>
                              <MDBCol>
                                {[...Array(comment?.rating)]?.map(
                                  (_i, index) => {
                                    return <MDBIcon fas icon="star" key={index}></MDBIcon>;
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
                        <MDBIcon fas icon="heart" className="mt-3"/>

                        {/* Shop */}
                        {
                        product.shopid===userid
                        &&!comment.feedback
                        && 
                        <div className="mt-3" style={{cursor:"pointer",color:"blue"}}
                          onClick={()=>(setFeedback(index))}
                        >
                          Phản hồi
                        </div>
                        } 

                      </MDBCol>
                    </MDBRow>
                      
                    {/* Shop and User */}
                    { comment.feedback&&
                      <MDBRow className="mt-4" > 
                        <MDBCol className="col-1">

                        </MDBCol>
                        <MDBCol className="col-10" style={{border:"0.1px solid #eee",borderRadius:"3px"}}>
                          <MDBRow>

                          <MDBCol className="col-1" >
                              <MDBCardImage src={comment.avatarshop} width="60px"  style={{borderRadius:"50%"}}/>
                          </MDBCol>
                          <MDBCol className="col-10">
                            <MDBRow style={{fontWeight:"bold"}}>
                              {comment.shopname}
                            </MDBRow>
                            <MDBRow>

                              {comment.feedback}
                            </MDBRow>
                          </MDBCol>
                          </MDBRow>

                        </MDBCol>
                    </MDBRow>

                    }
                    {
                    product.shopid===userid&&index===feedback&&
                    <MDBRow className="mt-4"> 
                        <MDBCol className="col-1">

                        </MDBCol>
                        <MDBCol className="col-10">
                          <MDBInput value={feedbackContent} onChange={(e)=>setFeedbackContent(e.target.value)}>
                            
                          </MDBInput>
                        </MDBCol>
                        <MDBCol className="col-1">
                            <button className="btn btn-primary" style={{padding:"3px 10px"}} 
                              onClick={()=>handleFeedback(comment.userid._id)}
                            >gửi</button>
                        </MDBCol>
                    </MDBRow>
                    }
                  </MDBCard>

                );
              })}
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
      
      {/* User */}
       {product?.shopid!==userid  && <div style={{position:"fixed", right:"20px",bottom:"40px",display:"flex",flexDirection:"column"}}>
          <div>
            <MDBIcon far icon="comment" size="2x"/>
          </div>
          <div style={{cursor:"pointer",color:"blue"}} 
            onClick={()=>{
              navigate(`/profile-other?key=${product.shopid}`)
              window.scrollTo(0,0)
            }}
          >
            Liên hệ chủ cửa hàng
          </div>
      </div>}
    </div>
  );
}

export default memo(ProductDetail);
