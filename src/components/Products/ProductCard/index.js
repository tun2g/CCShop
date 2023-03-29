import { useMemo,memo } from 'react';
import React from "react";
import './ProductCard.module.scss'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import {useNavigate} from 'react-router-dom'

function ProductCard(props) {
  const navigate=useNavigate()
  const handleClickDetail=()=>{
      const id=props.product._id.toString()
      navigate(`/product?key=${id}`)
      window.scrollTo(0, 0);
  }
  return (
      <MDBRow className="justify-content-center mb-3">
        <MDBCol md="12" xl="20">
          <MDBCard className="shadow-0 border rounded-3">
            <MDBCardBody>
                <MDBRow md="4" lg="9" className="mb-4 mb-lg-0" >
                  <MDBCol style={{alignItems:"center",justifyContent:"center"}}>
                    <div className="bg-image hover-zoom">
                        <img src={props.product.imageurl} className="rounded" style={{height:"125px"}}/>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow md="8">
                  <h5>{props.product.name}</h5>
                  <div className="d-flex flex-row">
                    <div className="mb-1 me-2">
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                      <MDBIcon fas icon="star" />
                    </div>
                    {/* <span>145</span> */}
                  </div>
                  <p className="text-truncate mb-4 mb-md-0">
                    {props.product.description}
                  </p>
                </MDBRow>

                <MDBRow
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                  <div className="d-flex flex-column align-items-center mb-1">
                    <h4 className="mb-1 me-1">${props.product.price}</h4>
                    <span className="text-danger">
                      <s>$25.99</s>
                    </span>
                  </div>
                  {/* <h6 className="text-success"></h6> */}
                  <div className="d-flex flex-column">
                    <button className='btn btn-primary' onClick={handleClickDetail}>
                      Chi tiết
                    </button>
                  </div>
                </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
  );
}


export default memo(ProductCard);
