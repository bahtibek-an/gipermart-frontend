import React from "react";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IoIosArrowDown } from "react-icons/io";
import { Container } from "@mui/system";
import "../../assets/scss/_filter.scss";
import { Link, useParams } from "react-router-dom";
import { FormControlLabel, OutlinedInput } from "@mui/material";
import { IoLogoUsd } from "react-icons/io";
import Checkbox from "@mui/material/Checkbox";
import Title from "../../components/title/Title";
import Cart from "../../components/cart/Cart";
import { useSelector } from "react-redux";

const Category = () => {
    const { categoryId } = useParams();
    const category = useSelector((state) => state.categories?.find((item) => item?.id == categoryId))
    const products = useSelector((state) => state.products?.filter((item) => item?.product?.category == categoryId));
    
    return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <div className="grid lg:grid-cols-12 grid-cols-6 gap-4 filter my-12">
          <div className="lg:col-span-3 col-span-6">
            <div>
              <Accordion className="all-category">
                <AccordionSummary
                  expandIcon={<IoIosArrowDown />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Все категории</Typography>
                </AccordionSummary>
                {category?.children?.map((item) => (
                    <Link to={`/category/${item.id}`} key={item.id} className="item">
                        {item.name}
                    </Link>
                ))}
                {/* <Link to="" className="item">
                  Духовые шкафы
                </Link>
                <Link to="" className="item">
                  Духовые шкафы
                </Link>
                <Link to="" className="item">
                  Духовые шкафы
                </Link>
                <Link to="" className="item">
                  Духовые шкафы
                </Link> */}
              </Accordion>
            </div>
          </div>
          <div className="lg:col-span-9 col-span-6">
            <Title title={category?.name} style="f-medium mb-4" />
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-2">
              {products.map((item) => (
                <Cart cart={item} key={item.id}/>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Category;
