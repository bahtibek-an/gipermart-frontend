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
import { useSelector } from "react-redux";
import $host from "../../http";
import LoadingCart from "../cart/LoadingCart";

const SimilarCarts = ({ category: categoryId }) => {
  const category = useSelector((state) => state.categories.find((item) => item.id === categoryId));
  const [ products, setProducts ] = useState();
  const [ loading, setLoading ] = useState(true);
  
  useEffect(() => {
    async function fetchSimilarCarts() {
      const { data } = await $host.get(`product/product_filter/?search=${category?.slug}&limit=20`);
      let results = data.results;
      if(results.length > 0) {
        while(results.length < 6) {
          results = results.concat(results);
        }
      }
      setProducts(results);
      return data.results;
    }
    fetchSimilarCarts()
      .then(() => setLoading(false));
  }, []);

  let settings = {
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <BsArrowRight color="#eb7471" size={24} />,
    prevArrow: <BsArrowLeft color="#eb7471" size={24} />,

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
          <Title title={"Похожие товары"} style="mt-8 mb-4 red" />
        </Link>
        <Slider {...settings} className="similar-carts">
          {loading ? (
            [1, 2, 3, 4, 5, 6, 7].map((item) => (
              <LoadingCart key={item}/>
            ))
          ) : (
            products.map((item) => (
              <Cart key={item.id} cart={item}/>
            ))
          )}
        </Slider>
      </Container>
    </div>
  );
};

export default SimilarCarts;
