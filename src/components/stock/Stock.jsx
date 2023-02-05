import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../title/Title";
import "../../assets/scss/_stock.scss";
import Slider from "react-slick";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import SlickArrowRight from "../SlickArrow/SlickArrowRight";
import SlickArrowLeft from "../SlickArrow/SlickArrowLeft";

const Stock = () => {
  const [ stockProducts, setStockProducts ] = useState([]);

  const fetchStockProducts = async () => {
    const response = await fetch("https://yruoebgair.tk/outside/stock/");
    const products = await response.json();
    if(products.count === 0) return;
    setStockProducts(products.results);
  }

  useEffect(() => {
    fetchStockProducts();
  }, [])

  let settings = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    nextArrow: <SlickArrowRight color="#eb7471" size={24} />,
    prevArrow: <SlickArrowLeft color="#eb7471" size={24} />,

    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container maxWidth="xl">
      <Title title="Акции" style="f-bold mt-6 mb-2" />
      <Slider {...settings} className="stock">
        {stockProducts?.map((item) => (
          <Link to="" className="pr-4" key={item.id}>
            <img src={item.images} alt="" />
          </Link>
        ))}
      </Slider>
    </Container>
  );
};

export default Stock;
