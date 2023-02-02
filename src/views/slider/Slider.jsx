import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../assets/scss/_slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

const HomeSlider = () => {
  const [ sliders, setSliders ] = useState([]);

  const fetchSliders = async () => {
    const response = await fetch("https://yruoebgair.tk/outside/slider/");
    const sliders = await response.json();
    if(sliders.count === 0) return;
    setSliders(sliders);
  }

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <Slider
      className="slider"
      infinite={true}
      speed={2000}
      autoplay={true}
      autoplaySpeed={5000}
      slidesToShow={1}
      slidesToScroll={1}
      nextArrow={<FiArrowRightCircle size={16} stroke="#000" fill="#fff" />}
      prevArrow={<FiArrowLeftCircle size={16} stroke="#000" fill="#fff" />}
    >
      {sliders?.map((item) => (
        <Link to="/special-order" key={item.id}>
          <img src={item.images} alt="" />
        </Link>
      ))}
    </Slider>
  );
};

export default HomeSlider;
