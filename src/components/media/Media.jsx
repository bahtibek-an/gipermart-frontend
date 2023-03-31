import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "../../assets/scss/_media.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { Container } from "@mui/system";
import Title from "../title/Title";
import Cart from "../cart/Cart";
import { connect } from "react-redux";
import SlickArrowRight from "../SlickArrow/SlickArrowRight";
import SlickArrowLeft from "../SlickArrow/SlickArrowLeft";
import $host from "../../http";
import LoadingCart from "../cart/LoadingCart";



const Media = () => {
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await $host.get("product/category/tv-i-media/");
      setProducts(data);
      return data;
    }
    fetchProducts()
      .then(() => setLoading(false));
  }, []);

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
          <Title title={"Телевизоры и Медиа"} style="mt-8 mb-4 red" />
        </Link>
        <Slider {...settings} className="media">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map((item) => (
              <LoadingCart key={item}/>
            ))
          ) : (
            products?.map((item) => (
              <Cart cart={item} key={item.id}/>
            ))
          )}
        </Slider>
      </Container>
    </div>
  );
};
export default Media;
