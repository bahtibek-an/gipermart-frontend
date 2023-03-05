import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Title from "../title/Title";
import "../../assets/scss/_stock.scss";
import Slider from "react-slick";
import SlickArrowRight from "../SlickArrow/SlickArrowRight";
import SlickArrowLeft from "../SlickArrow/SlickArrowLeft";

const Stock = () => {
  const [ stockProducts, setStockProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const fetchStockProducts = async () => {
    const response = await fetch("https://yruoebgair.tk/dashboard/stocks/");
    const products = await response.json();
    if(products.count === 0) return;
    setLoading(false);
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

  if(loading) {
    return null;
  }

  return (
    <Container maxWidth="xl">
      <Title title="Акции" style="f-bold mt-6 mb-2" />
      <Slider {...settings} className="stock">
        <div>
          {stockProducts?.map((item) => (
            <a href={item.url} className="pr-4" key={item.id}>
              <img src={item.images} alt="" />
            </a>
          ))}
        </div>
      </Slider>
    </Container>
  );
};

export default Stock;
