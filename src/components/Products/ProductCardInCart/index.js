import { useMemo,memo,useState, useEffect } from 'react';
import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { useDebounce } from '../../../utils/service';
import axios from 'axios';


function ProductCardInCart(props) {
  const navigate=useNavigate()

  const [quantity, setQuantity] = useState(props.cart.quantity);
  const [cost, setCost]=useState(props.cart.cost)
  

  // this variable prevent call api `/update` in the first page load
  const [defaultState,setDefault]=useState('default')


  const debouncQuantity=useDebounce(quantity,1000)

  useEffect(()=> {
    defaultState!=='default'&&axios.post(`${process.env.REACT_APP_SERVER_API_URI}/cart/update`,{quantity,cost,_id:props.cart._id},
    {
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res=>{
      
    })
    .catch(err=>{
      console.log(err)
    })
  },[debouncQuantity])

  function handleIncrement() {
      setQuantity(quantity + 1);
      setCost((quantity+1)*props.product.price)
      setDefault('')
  }

  function handleDecrement() {
      setQuantity(quantity > 1 ? quantity - 1 : 1);
      quantity>1&&setCost((quantity-1)*props.product.price)
      setDefault('')
  }
  
  
  const handleDeleteCart=()=>{
    axios.delete(`${process.env.REACT_APP_SERVER_API_URI}/cart/delete/${props.cart._id}`,)
    .then(res=>{
      
    })
    .catch(err=>{
      console.log(err)
    })
    props.isDeleted
    ?
    props.changeDelete(false)
    :
    props.changeDelete(true)

  }  
  return (
    <MDBContainer fluid>
      <MDBRow className="justify-content-center mb-3">
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
                    <div className="mb-1 me-2">
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
                    {props.product.description}
                  </p>
                  <div className="d-flex flex-row align-items-center mt-5">
                    <h4 className="mb-1 me-1">${props.product.price}</h4>
                    <span className="text-danger">
                      <s>$25.99</s>
                    </span>
                  </div>
                </MDBCol>
                <MDBCol
                  md="6"
                  lg="3"
                  className="border-sm-start-none border-start"
                >
                  <div className="d-flex flex-row mt-4">

                    <InputGroup>
                        <Button variant="outline-secondary" onClick={handleDecrement}>-</Button>
                        <FormControl type="text" value={quantity} readOnly  />
                        <Button variant="outline-secondary" onClick={handleIncrement}>+</Button>
                    </InputGroup>
                  </div>
                  <h6 className="text-success mt-5">{cost} đồng</h6>
                  <div className="d-flex flex-column mt-4">
                    <button className='btn btn-primary' onClick={handleDeleteCart}>
                       a
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


export default memo(ProductCardInCart);
