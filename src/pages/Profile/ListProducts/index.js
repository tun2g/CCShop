import React from "react";
import { useState,memo, useEffect } from "react";
import axios from "axios";
import {
    MDBCardImage,
    MDBCol,
    MDBRow
} from "mdb-react-ui-kit"

const ListProducts = (props) => {
  const [list, setList] = useState([]);
  useEffect(() => {
      console.log("list render")
      props.loadProduct && getProductList();
    },
    [props.loadProduct]
  );

  const getProductList = () => {
    props.user?.isShop &&
      axios
        .get(
          `${process.env.REACT_APP_SERVER_API_URI}/product/get-all/${props.user._id}`
        )
        .then((res) => {
          setList(res.data);
          props.changeLoadProduct(false);
        })
        .then((err) => {
          console.log(err);
        });
  };
  return (<>
              {props.user?.isShop &&
            list?.map((pro, index) => {
              if (index % 2 === 0)
                return (
                  <MDBRow key={index}>
                    <MDBCol className="mb-2">
                      <MDBCardImage
                        src={pro.imageurl}
                        alt="image 1"
                        className="w-100 rounded-3"
                      />
                    </MDBCol>
                    {list[index + 1] && (
                      <MDBCol className="mb-2">
                        <MDBCardImage
                          src={list[index + 1].imageurl}
                          alt="image 1"
                          className="w-100 rounded-3"
                        />
                      </MDBCol>
                    )}
                  </MDBRow>
                );
              else return <div key={index}></div>;
            })}
  </>);
};

export default memo(ListProducts);
