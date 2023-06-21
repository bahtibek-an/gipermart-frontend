import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../assets/scss/_recommendations.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { Container } from "@mui/system";
import Title from "../title/Title";
import Cart from "../cart/Cart";
import SlickArrowLeft from "../SlickArrow/SlickArrowLeft";
import SlickArrowRight from "../SlickArrow/SlickArrowRight";
import $host from "../../http";
import LoadingCart from "../cart/LoadingCart";


const Recommendations = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await $host.get("/product/product_filter/?price=&is_recommend=true");
      setProducts(data.results);
      return data.results;
    }
    fetchProducts()
      .then(() => setLoading(false));
  }, []);

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
          slidesToScroll: 1,
        },
      },
    ],
  };
  

  return (
    <div className="my-4">
      <Container maxWidth="xl">
        <Link to="">
          <Title title={"Гипермарт Рекомендует"} className="mt-8 mb-4 red" />
        </Link>
        <Slider {...settings} className="recommendations">
          {loading ? (
            new Array(6).fill(1).map((item) => (
              <LoadingCart key={item}/>
            ))
          ) : (
            products.map((item, i) => (
              <Cart cart={item} key={i} />
            ))
          )}
        </Slider>
      </Container>
    </div>
  );
};


export default (Recommendations);