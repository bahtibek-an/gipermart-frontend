import { Container } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../../assets/scss/_departments.scss";
import { categoriesAlgo } from "../../helper";

const Departments = () => {
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => (state.categories).slice(0, 3));

  return (
    <Container maxWidth="xl">
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-10 my-12">
        {categories.map((category) => (
        <div className="box" key={category.id}>
          <Link to={`/category/${category.id}`} className="block pb-4 border-b title red">
            {category.name}
          </Link>
          {products.filter((product) => product?.product?.category == category?.id).map((product) => (
          <Link key={product.id} to={`/product/${product.product?.id}/`} className="department-box">
            <div className="department-image relative">
              <div className="discount">-6%</div>
              <img
                src={"https://yruoebgair.tk/" + product.media[0]?.img_url}
                alt=""
              />
            </div>
            <div className="department-text">
              <div className="department-name">
                {product.product?.name}
              </div>
              <div className="department-rassrochka">{product.installment_plan}</div>
              <div className="department-price">
                <div className="price">{product.sale_price} Сум</div>
                <div className="price_old">{product.price} Сум</div>
              </div>
            </div>
          </Link>
          ))}
        </div>
        ))}
      </div>
    </Container>
  );
};

export default Departments;
