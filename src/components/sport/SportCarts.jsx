import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../../assets/scss/_sport.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import Title from "../title/Title";
import Cart from "../cart/Cart";
import { connect } from "react-redux";
import SlickArrowRight from "../SlickArrow/SlickArrowRight";
import SlickArrowLeft from "../SlickArrow/SlickArrowLeft";

const SportCarts = ({ products }) => {
  
  let settings = {
    dots: false,
    slidesToShow: 6,
    infinite: false,
    slidesToScroll: 1,
    nextArrow: <SlickArrowRight color="#eb7471" size={24} />,
    prevArrow: <SlickArrowLeft color="#eb7471" size={24} />,

    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesPerRow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="my-4">
      <Container maxWidth="xl">
        <Link to="">
          <Title title={"Спорт товары"} style="mt-8 mb-4 red" />
        </Link>
        <Slider {...settings} className="sport">
          {products?.map((item) => (
            <Cart cart={item} key={item.id}/>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products?.products,
    isLoading: state.app.isLoading
  }
}

export default connect(mapStateToProps, null)(SportCarts);
