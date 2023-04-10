import { memo, useState, useEffect } from "react";
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectId } from "../../../ReduxService/UserSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTotalQuantity } from "../../../ReduxService/CartSlice";
import parse from "html-react-parser";
import ReviewProduct from "../ReviewProduct";
function ProductDetail() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const dispatch = useDispatch();
  //redux-toolkit
  const userid = useSelector(selectId);

  const navigate = useNavigate();

  const keyProduct = searchParams.get("key");

  const [product, setProduct] = useState();

  // quantity of product order
  const [quantity, setQuantity] = useState(1);

  // set rating input
  const [rating, setRating] = useState(0);

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

    return () => {};
  }, []);

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
        if (res.data.status === 502) {
          dispatch(updateTotalQuantity(1));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ position: "relative" }}>
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
                      <span>{product?.rating}</span>
                    </div>

                    <p className=" mt-5 mb-4 mb-md-0">
                      {product?.introduction}
                    </p>
                    <h4 className="mt-2 mb-1 me-1">{product?.price} đồng</h4>
                  </MDBCol>
                  <MDBCol
                    md="6"
                    lg="3"
                    className="border-sm-start-none border-start"
                  >
                    {product?.shopid !== userid ? (
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
                            <FormControl
                              type="text"
                              value={quantity}
                              readOnly
                            />
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
                    ) : (
                      <div>
                        <button
                          className="btn btn-primary mt-4"
                          onClick={() => {
                            navigate(
                              `/shop?update=${true}&_id=${product?._id}`
                            );
                            window.scrollTo(0, 0);
                          }}
                        >
                          Cập nhật sản phẩm
                        </button>
                      </div>
                    )}
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      {/* Chi tiết sản phẩm */}
      <div className="container mt-5 " style={{ backgroundColor: "white" }}>
        <div className="row">
          <div className="col-10">
            <div className="row  border shadow-0 rounded-3 mt-3">
              <div id="description">
                {parse(product?.description ? product.description : "")}
              </div>
            </div>
          </div>
          <div className="col-2">Quảng Cáo</div>
        </div>
      </div>

      {/*  */}

      {/* Đánh giá sản phẩm */}

      <ReviewProduct
        rating={rating}
        keyProduct={keyProduct}
        changeRating={changeRating}
        product={product}
      />

      {/* User */}
      {product?.shopid !== userid && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "40px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <MDBIcon far icon="comment" size="2x" />
          </div>
          <div
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => {
              navigate(`/profile-other?key=${product.shopid}`);
              window.scrollTo(0, 0);
            }}
          >
            Liên hệ chủ cửa hàng
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(ProductDetail);
