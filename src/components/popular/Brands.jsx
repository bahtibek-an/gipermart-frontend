import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Title from "../title/Title";
import "../../assets/scss/_brands.scss";

const Brands = () => {
  const [ brands, setBrands ] = useState([]);

  const fetchBrands = async () => {
    const response = await fetch("https://api.gipermart.uz/outside/brand/");
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
          <a href={item.url} className="brand" key={item.id}>
            <img src={item.images} alt="" />
          </a>
        ))}
      </div>
    </Container>
  );
};

export default Brands;
