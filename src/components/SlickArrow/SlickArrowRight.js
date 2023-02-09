import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";

const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <BsArrowRightCircle
      {...props}
      // className={
      //   "slick-prev slick-arrow" +
      //   (currentSlide === 0 ? " slick-disabled" : "")
      // }
      // aria-hidden="false"
      // aria-disabled={currentSlide === 0 ? true : false}
      type="button"
    />
);

export default SlickArrowRight;