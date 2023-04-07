import { useMemo,memo, useState } from 'react';
import React from "react";
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import {useNavigate} from 'react-router-dom'



function ProductCard(props) {
  const navigate=useNavigate()
  const handleClickDetail=()=>{
      const id=props.product._id.toString()
      navigate(`/product?key=${id}`)
      window.scrollTo(0, 0);
  }
  const [isHovered,SetIsHovered]=useState(false)
  return (
      <MDBRow className="justify-content-center mb-3" >
        <MDBCol md="12" xl="20">
          <MDBCard className={("shadow-0", "border" ,"rounded-3",{
            "shadow-lg":isHovered
          })} 
          style={{maxWidth:'300px',height:"400px",cursor:"pointer"}} 
          onClick={handleClickDetail}
          onMouseOver={()=>{
            SetIsHovered(true)
          }}
          onMouseLeave={()=>{
            SetIsHovered(false)
          }}
          >
            <MDBCardBody>
                <MDBRow md="8" lg="9" className="mb-2 mb-lg-0" >
                  <MDBCol style={{alignItems:"center",justifyContent:"center"}}>
                    <div className="bg-image hover-zoom">
                        <img src={props.product.imageurl} className="rounded" style={{height:"250px"}}/>
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow md="8">
                  <h5>{props.product.name}</h5>
                 
                  <p className="text-truncate mb-4 mb-md-0">
                    {props.product.introduction}
                  </p>
                </MDBRow>

                <MDBRow
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                  <div className="d-flex flex-column align-items-center mb-1">
                    <h6 className="mb-1 me-1" style={{color:"blue"}}>{props.product.price} đồng</h6>
                  </div>
                </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
  );
}


export default memo(ProductCard);
