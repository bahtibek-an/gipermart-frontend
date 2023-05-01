import React from "react";
import Slider from "react-slick";
import "../../assets/scss/_category.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import { connect } from "react-redux";
import SlickArrowRight from "../../components/SlickArrow/SlickArrowRight";
import SlickArrowLeft from "../../components/SlickArrow/SlickArrowLeft";
import {API_URL} from "../../http";
import { Skeleton } from "@mui/material";

const Category = ({ categories }) => {

  const settings = {
    infinite:false,
    dots: false,
    slidesToShow: 5,
    arrows: true,
    speed: 500,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed:4000,
    nextArrow: <SlickArrowRight size={14} />,
    prevArrow: <SlickArrowLeft size={14} />,
    responsive:[
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,

        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      
    ]
  }

  return (
    <div className="my-4">
      <Container maxWidth="xl">
        <Slider 
          {...settings} 
          className="category-slider"
          lazyLoad="progressive" 
        >
          {categories.length === 0 ? (
            new Array(5).fill(3).map((_, index) => (
              <div key={index}>
                <Skeleton
                  variant="rectangular"
                  width="220px"
                  height="96px"
                  animation="wave"
                  style={{maxWidth: "100%"}}
                />
              </div>
            ))
          ) : (
            categories?.map((item, i) => (
              item.parent && (
              <div key={i}>
                <Link to={`/category/${item.id}`} className="category-box">
                  <img
                    src={API_URL + item.background_image}
                    alt=""
                  />
                  <div>{ item.name }</div>
                </Link>
              </div>
              )
            ))
          )}
        </Slider>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: (state.categories)
  }
}

export default connect(mapStateToProps, null)(Category);
