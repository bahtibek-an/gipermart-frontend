import { Container } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/scss/_departments.scss";
import ProductItem from "./components/ProductItem/ProductItem";

const Departments = () => {
  const categories = useSelector((state) => (state.categories).filter((item) => item.parent).slice(0, 3));

  return (
    <Container maxWidth="xl">
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-10 my-12">
        {categories.map((category) => (
        <div className="box" key={category.id}>
          <Link to={`/category/${category.id}`} className="block pb-4 border-b title red">
            {category.name}
          </Link>
          <ProductItem category={category}/>
        </div>
        ))}
      </div>
    </Container>
  );
};

export default Departments;
