import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import "../../assets/scss/_brands.scss";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Brands = () => {
  const [ brands, setBrands ] = useState([]);

  const fetchBrands = async () => {
    const response = await fetch("https://yruoebgair.tk/outside/brand/");
    const brands = await response.json();
    if(brands.count === 0) return;
    setBrands(brands.results);
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <Container maxWidth="xl">
      <Title title={"Популярные бренды"} style="f-bold" />
      <div className="brands my-4">
        {brands?.map((item) => (
          <Link to="/" className="brand" key={item.id}>
            <img src={item.images} alt="" />
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Brands;
