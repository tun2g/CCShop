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
import { selectId } from "../../../ReduxService/UserSlice";
import RatingStar from "../RatingStar";
import { useDebounce } from "../../../utils/service";
import { useNavigate } from "react-router-dom";

function ProductDetail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyProduct = searchParams.get("key");
  const userid = useSelector(selectId);
  const navigate=useNavigate()
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [listComments, setlist] = useState([]);
  const [newComments, setNewComment] = useState(false);

  const bounce = useDebounce(rating, 1000);

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

  const handleReview = () => {
    rating !== 0 &&
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
  };
  return (
    <div>
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
                    <h5>Name</h5>
                    <div className="d-flex flex-row">
                      <div className="text-danger mb-1 me-2">
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                        <MDBIcon fas icon="star" />
                      </div>
                      <span>145</span>
                    </div>
                    <div className="mt-1 mb-0 text-muted small">
                      <span>100% cotton</span>
                      <span className="text-primary"> • </span>
                      <span>Light weight</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Best finish
                        <br />
                      </span>
                    </div>
                    <div className="mb-2 text-muted small">
                      <span>Unique design</span>
                      <span className="text-primary"> • </span>
                      <span>For women</span>
                      <span className="text-primary"> • </span>
                      <span>
                        Casual
                        <br />
                      </span>
                    </div>
                    <p className="text-truncate mb-4 mb-md-0">Des</p>
                    <h4 className="mb-1 me-1">$17.99</h4>
                    <span className="text-danger">
                      <s>$25.99</s>
                    </span>
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-10">
            <div className="row  border shadow-0 rounded-3">
              <h1 className="mt-2">Mô tả sản phẩm</h1>
              <p>
                Chào mừng bạn đến cửa hàng Fine chính thức. Hàng hóa trong cửa
                hàng có sẵn trong kho, và bạn có thể đặt hàng trực tiếp. Mua sắm
                vui vẻ!
                <br />
                * Mẹo mua sắm:
                <br />
                1. Đối với câu hỏi mua sắm, vui lòng liên hệ với dịch vụ khách
                hàng của chúng tôi.
                <br />
                2. Đối với sản phẩm từ Trung Quốc, các ước tính thời gian giao
                hàng là khoảng 2-5 ngày kể từ ngày đặt hàng, thường là trong
                vòng khoảng 10-20 ngày làm việc;
                <br />
                3. Tất cả các sản phẩm trong cửa hàng này đều có giá bán buôn;
                <br />
                4. Hoạt động trên toàn cửa hàng, giảm giá từ 5-60%;
                <br />
                5. nhận phiếu giảm giá trước khi đặt hàng để được Giảm giá nhiều
                hơn (vào trang chủ cửa hàng để nhận);
                <br />
              </p>
            </div>
            <div className="row mt-5 des shadow-0 border rounded-3">
              <h1 className="mt-2">Chi tiết sản phẩm</h1>
              <p>
                Chất liệu: Hợp kim + ngọc trai <br />
                Màu sắc: Như hình <br />
                Phong cách: Hàn Quốc & thời trang <br />
                Nhân dịp: quà sinh nhật tiệc tùng <br />
                Đóng gói: 1 chiếc vòng tay <br />
              </p>
            </div>
          </div>
          <div className="col-2">Quảng Cáo</div>
        </div>
      </div>

      {/*  */}

      {/* Đánh giá sản phẩm */}

      <MDBContainer className="mt-3 border rounded-3">
        <h3 className="mt-3">Đánh giá sản phẩm</h3>
        <div className="col-2 mt-3">
          <RatingStar rating={rating} changeRating={changeRating} />
        </div>

        <div className="mt-3">
          <MDBInput
            hint="Tìm kiếm sản phẩm"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></MDBInput>
        </div>
        <div className="mt-3 ">
          <button className="btn btn-primary" onClick={handleReview}>
            Đánh giá
          </button>
        </div>

        <div className="mt-3 col-10">
          <h5>Dánh sách đánh giá</h5>
          <MDBRow className="p-1">
            <MDBCol>
              {listComments?.map((comment) => {
                return (
                  <MDBCard key={comment._id} className="p-1 mt-2">
                    <MDBRow>
                      <MDBCol>
                        <MDBRow>
                          <MDBCol className="col-1">
                            <MDBCardImage
                              src={comment.userid.avatar}
                              className="w-100 border"
                              style={{ borderRadius: "50%" }}
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
                            <MDBRow>{comment.userid.username}</MDBRow>
                            <MDBRow style={{ color: "red" }}>
                              <MDBCol>
                                {[...Array(comment?.rating)]?.map(
                                  (_i, index) => {
                                    return <MDBIcon fas icon="star"></MDBIcon>;
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
                      </MDBCol>
                    </MDBRow>
                  </MDBCard>
                );
              })}
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>

      {/*  */}
    </div>
  );
}

export default memo(ProductDetail);