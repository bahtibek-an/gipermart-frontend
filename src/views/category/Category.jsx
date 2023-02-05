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

const Category = ({ categories }) => {

  let settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SlickArrowRight size={14} />,
    prevArrow: <SlickArrowLeft size={14} />,

    responsive: [
      {
        breakpoint: 1280,
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
        breakpoint: 540,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="my-4">
      <Container maxWidth="xl">
        <Slider {...settings} className="category-slider">
          {categories?.map((item, i) => (
            <div key={i}>
              <Link to="" className="category-box">
                <img
                  src={item.image}
                  alt=""
                />
                <div>{ item.title }</div>
              </Link>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories?.categories
  }
}

export default connect(mapStateToProps, null)(Category);
