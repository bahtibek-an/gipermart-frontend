import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import "../../assets/scss/_stock.scss";
import Slider from "react-slick";
import SlickArrowRight from "../SlickArrow/SlickArrowRight";
import SlickArrowLeft from "../SlickArrow/SlickArrowLeft";
import { Skeleton } from "@mui/material";

const Stock = () => {
  const [ stockProducts, setStockProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const fetchStockProducts = async () => {
    const response = await fetch("https://api.gipermart.uz/dashboard/stocks/");
    const products = await response.json();
    if(products.count === 0) return;
    setStockProducts(products.results);
    setLoading(false);
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
        {loading ? (
          new Array(3).fill(1).map((_, index) => (
            <div className="pr-4" key={index}>
              <Skeleton 
                variant="rectangular"
                width="400px"
                height="172px"
                animation="wave"
              />
            </div>
          ))
        ) : (
          stockProducts?.map((item) => (
            <a href={item.url} className="pr-4" key={item.id}>
              <img src={item.images} alt="" />
            </a>
          ))
        )}
      </Slider>
    </Container>
  );
};

export default Stock;
