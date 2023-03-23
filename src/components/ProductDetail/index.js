import { useMemo,memo, useState, useEffect } from 'react';
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button, InputGroup, FormControl } from 'react-bootstrap';


function ProductDetail() {
    const location=useLocation()
    const searchParams = new URLSearchParams(location.search);
    const keyProduct = searchParams.get('key');

    const [product,setProduct]=useState()
    const [quantity, setQuantity] = useState(1);

    function handleIncrement() {
        setQuantity(quantity + 1);
    }

    function handleDecrement() {
        setQuantity(quantity > 1 ? quantity - 1 : 1);
    }
    

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_SERVER_API_URI}/product/get-product/${keyProduct}`,{
          headers:{
            "Content-Type":"application/json"
          }
        })
        .then((p)=>{
            setProduct(p.data)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-3">
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
                  <p className="text-truncate mb-4 mb-md-0">
                    Des
                  </p>
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

                        <div>
                            Số lượng: 
                        </div>
                        <InputGroup>
                            <Button variant="outline-secondary" onClick={handleDecrement}>-</Button>
                            <FormControl type="text" value={quantity} readOnly  />
                            <Button variant="outline-secondary" onClick={handleIncrement}>+</Button>
                        </InputGroup>
                    </div>

                    {product?.size? <div>
                        <div className="d-flex flex-row mt-4">
                        <div>
                            Kích thước: 
                        </div>
                        <InputGroup>

                        </InputGroup>
                    </div>
                    </div> 
                    :''}
                    <button className='btn btn-primary mt-4' >
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
  );
}


export default memo(ProductDetail);
