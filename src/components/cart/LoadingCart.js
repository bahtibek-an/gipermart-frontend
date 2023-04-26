import React from "react";
import "../../assets/scss/_cart.scss";
import { Skeleton } from "@mui/material";

const LoadingCart = ({  }) => {

  return (
    <div className="cart">
        <div className="">
          <div className="cart-image">
            <Skeleton 
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
            />
          </div>
          <div className="cart-name">
            <Skeleton variant="text" width="80%"/>
          </div>
          <div className="f-bold text-center">
            <Skeleton variant="text" width="100%"/>
          </div>
          <div className="">
            <div className="cart-price f-bold">
                <Skeleton variant="text" width="60%"/>   
            </div>
          </div>
        </div>
    </div>
  );
};

export default LoadingCart;
