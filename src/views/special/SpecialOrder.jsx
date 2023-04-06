import React, {useEffect, useState} from "react";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import "../../assets/scss/_special_order.scss";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import Title from "../../components/title/Title";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import Slider from "react-slick";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
// import { Button, Card } from "@mui/material";
import { useSelector } from "react-redux";
import Cart from "../../components/cart/Cart";
import $host from "../../http";
import LoadingCart from "../../components/cart/LoadingCart";

const SpecialOrder = () => {
  const [ loading, setLoading ] = useState(true);
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    const fetchUsaProducts = async () => {
      const { data } = await $host.get(`product/api/product-usa/?USA_product=true`);
      setProducts(data.results);
    }
    fetchUsaProducts()
        .then(() => setLoading(false));
  }, []);

  let settings = {
    dots: false,
    infinite: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    nextArrow: <BsArrowRight size={14} />,
    prevArrow: <BsArrowLeft size={14} />,

    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 4,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <SecondNavbar />
      <section className="special-order">
        <Container maxWidth="xl">
          <div className="pages">
            <Link to="/">Магазин / </Link>
            <div>Товар из Америки</div>
          </div>
          <Title title="Товары из Америки" style="f-bold mb-8" />
          <Slider {...settings}>
            {loading ? (
                [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                    <LoadingCart key={index}/>
                ))
            ) : (
                products.map((item) => (
                    <Cart cart={item} key={item.id}/>
                ))
            )}
          </Slider>
          {/*<div className="grid md:grid-cols-2 mt-8">*/}
          {/*</div>*/}
        </Container>
      </section>
    </>
  );
};

export default SpecialOrder;
