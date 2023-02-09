import { Button } from "@mui/material";
import React, { useState } from "react";
import "../../assets/scss/_counter.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Counter = ({ quantity = 1, plusCounter, minusCounter }) => {
  

  return (
    <div className="counter">
      <Button onClick={minusCounter} className="minus">
        <AiOutlineMinus size={24} fill="#C4C4C4" />
      </Button>
      <div className="count">{quantity}</div>
      <Button onClick={plusCounter} className="plus">
        <AiOutlinePlus size={24} fill="#C4C4C4" />
      </Button>
    </div>
  );
};

export default Counter;
