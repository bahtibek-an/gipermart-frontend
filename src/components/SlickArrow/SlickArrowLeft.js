import React from "react";
import { BsArrowLeftCircle } from "react-icons/bs";

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <BsArrowLeftCircle
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-hidden="true"
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    />
);

export default SlickArrowLeft;