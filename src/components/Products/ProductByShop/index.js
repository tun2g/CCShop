import { memo } from 'react';
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import {useNavigate} from 'react-router-dom'
import parse from "html-react-parser"

function ProductByShop(props) {
  const navigate=useNavigate()
  const handleClickDetail=()=>{
      navigate(`/shop?update=${true}&_id=${props.product._id}`)
      window.scrollTo(0, 0);
  }
  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-3 pt-5">
        <MDBCol md="12" xl="10">
          <MDBCard className="shadow-0 border rounded-3">
            <MDBCardBody>
              <MDBRow>
                <MDBCol md="12" lg="3" className="mb-4 mb-lg-0">
                    <div className="bg-image hover-zoom">
                        <img src={props.product.imageurl} className="w-100 rounded" />
                    </div>
                </MDBCol>
                <MDBCol md="6">
                  <h5>{props.product.name}</h5>
                  <div className="d-flex flex-row">
                    <div className="text-danger mb-1 me-2">
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                    </div>
                    <span>145</span>
                  </div>
                  <p className="mb-4 mb-md-0">
                    {parse(props.product.introduction)}
                  </p>
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                  <div className="d-flex flex-row align-items-center mb-1">
                    <h4 className="mb-1 me-1">{props.product.price}</h4>
                    <span className="text-danger">
                      đồng
                    </span>
                  </div>
                  
                  <h6 className="text-success">Số lượng: {props.product.quantity}</h6>
                  <div className="d-flex flex-column mt-4">
                    <button className='btn btn-primary' onClick={handleClickDetail}>
                      Cập nhật
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


export default memo(ProductByShop);