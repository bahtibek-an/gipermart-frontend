import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../assets/scss/_slider.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
// import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import SlickArrowRight from "../../components/SlickArrow/SlickArrowRight";
import SlickArrowLeft from "../../components/SlickArrow/SlickArrowLeft";
import {API_URL} from "../../http";

const HomeSlider = () => {
  const [ sliders, setSliders ] = useState([]);

  const fetchSliders = async () => {
    const response = await fetch(API_URL + "dashboard/sliders/");
    const sliders = await response.json();
    let slidersResult = sliders.results;
    if(sliders.count === 0) return;
    setSliders(slidersResult);
  }

  useEffect(() => {
    fetchSliders();
  }, []);

  return (
    <Slider
      className="home-slider"
      infinite={true}
      speed={2000}
      autoplay={true}
      autoplaySpeed={5000}
      slidesToShow={1}
      slidesToScroll={1}
      nextArrow={<SlickArrowRight size={16} stroke="#000" fill="#fff" />}
      prevArrow={<SlickArrowLeft size={16} stroke="#000" fill="#fff" />}
    >
      {sliders?.map((item) => (
        <a href={item.url} key={item.id}>
          <img src={item.images} alt="" />
        </a>
      ))}
    </Slider>
  );
};

export default HomeSlider;
