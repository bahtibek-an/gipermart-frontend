import React from "react";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import "../../assets/scss/_special_order.scss";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import Title from "../../components/title/Title";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import Slider from "react-slick";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { Button, Card } from "@mui/material";
import { useSelector } from "react-redux";
import Cart from "../../components/cart/Cart";

const SpecialOrder = () => {
  const products = useSelector((state) => state?.products?.filter((item) => item?.product?.USA_product));
  
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
            {products.map((item) => (
              <Cart cart={item} key={item.id}/>
            ))}
          </Slider>
          <div className="grid md:grid-cols-2 mt-8">
            {/*<div>*/}
            {/*  <div className="mt-4">Регион/область*</div>*/}
            {/*  <FormControl fullWidth>*/}
            {/*    <Select*/}
            {/*      labelId="demo-simple-select-label"*/}
            {/*      id="demo-simple-select"*/}
            {/*    >*/}
            {/*      <MenuItem value={10}>Ten</MenuItem>*/}
            {/*      <MenuItem value={20}>Twenty</MenuItem>*/}
            {/*      <MenuItem value={30}>Thirty</MenuItem>*/}
            {/*    </Select>*/}
            {/*  </FormControl>*/}
            {/*  <div className="mt-4">Город/район*</div>*/}
            {/*  <FormControl fullWidth>*/}
            {/*    <Select*/}
            {/*      labelId="demo-simple-select-label"*/}
            {/*      id="demo-simple-select"*/}
            {/*    >*/}
            {/*      <MenuItem value={10}>Ten</MenuItem>*/}
            {/*      <MenuItem value={20}>Twenty</MenuItem>*/}
            {/*      <MenuItem value={30}>Thirty</MenuItem>*/}
            {/*    </Select>*/}
            {/*  </FormControl>*/}
            {/*  <div className="mt-4">Адрес*</div>*/}
            {/*  <TextField className="w-full" id="outlined-required" />*/}
            {/*  <div className="mt-4">*/}
            {/*    Ссылка на Товар{" "}*/}
            {/*    <span style={{ color: "rgba(51, 51, 51, 0.4)" }}>*/}
            {/*      (на бренд, увиденную на других сайтах)*/}
            {/*    </span>*/}
            {/*  </div>*/}
            {/*  <TextField className="w-full" id="outlined-required" />*/}
            {/*  <div className="flex items-center justify-end">*/}
            {/*    <Button className="yellow-btn-hover !px-4 !py-2 !mt-6 !mb-24 !text-base !rounded-none">*/}
            {/*      Заказать*/}
            {/*    </Button>*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>
        </Container>
      </section>
    </>
  );
};

export default SpecialOrder;
