import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../assets/scss/_recommendations.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { Container } from "@mui/system";
import Title from "../title/Title";
import Cart from "../cart/Cart";
import { connect } from "react-redux";
import SlickArrowLeft from "../SlickArrow/SlickArrowLeft";
import SlickArrowRight from "../SlickArrow/SlickArrowRight";


const Recommendations = ({ products: productLists, isLoading }) => {
  const [products, setProducts] = useState((() => {
    let result = [...productLists];
    if(result.length > 0) {
      while(result.length < 6) {
        result = result.concat(result);
      }
    }
    return result;
  })());

  let settings = {
    infinite: true,
    slidesToShow: 6,
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
          // slidesPerRow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  return (
    <div className="my-4">
      <Container maxWidth="xl">
        <Link to="">
          <Title title={"Гипермарт Рекомендует"} style="mt-8 mb-4 red" />
        </Link>
        <Slider {...settings} className="recommendations">
            {products.map((item, i) => (
              <Cart cart={item} key={i} />
            ))}
        </Slider>
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    isLoading: state.app.products
  }
} 

export default connect(mapStateToProps, null)(Recommendations);