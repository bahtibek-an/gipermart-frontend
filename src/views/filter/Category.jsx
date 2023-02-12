import React, { useEffect, useState } from "react";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { IoIosArrowDown } from "react-icons/io";
import { Container } from "@mui/system";
import "../../assets/scss/_filter.scss";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FormControlLabel, OutlinedInput } from "@mui/material";
import { IoLogoUsd } from "react-icons/io";
import Checkbox from "@mui/material/Checkbox";
import Title from "../../components/title/Title";
import Cart from "../../components/cart/Cart";
import { useSelector } from "react-redux";
import { fetchAttributesByCategoryId, fetchFilterProducts } from "../../http/ProductAPI";
import { sortFilterCategories } from "../../helper";

const Category = () => {
    const { categoryId } = useParams();
    const category = useSelector((state) => state.categories?.find((item) => item?.id == categoryId))
    const productsFromStore = useSelector((state) => state.products?.filter((item) => item?.product?.category == categoryId));
    const [ products, setProducts ] = useState(productsFromStore);
    const [ attr, setAttr ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const[ searchParams, setSearchParams ] = useState([]);

    const fetchAttributes = async () => {
      const attributes = [];
      products.forEach((item, i) => {
        return item.attributes?.forEach((attr, j) => {
          attributes.push({
            id: item.attribute_values[j],
            product_attribute: {
              id: attr.product_attribute.id,
              name: attr.product_attribute.name,
              description: attr.product_attribute.description,
            },
            attribute_value: attr.attribute_value
          });
        });
      });
      const sortData = sortFilterCategories(attributes || []);
      setAttr(sortData);
    }

    const fetchProducts = async () => {
      const param = searchParams.map((item) => `attribute_values=${item.id}`).join('&');
      const data = await fetchFilterProducts(param, category.slug);
      setProducts(data.results);
    }

    useEffect(() => {
      fetchProducts();
      setLoading(false);
    }, [searchParams, categoryId]);

    useEffect(() => {
      fetchAttributes();
    }, [categoryId]);

    const addToSearch = (e, data) => {
      const checked = e.target.checked;
      if(checked) {
        return setSearchParams((prev) => [...prev, data]);
      }
      return setSearchParams((prev) => prev.filter((item) => item.id != data.id));
    }

    if(loading) return;
    
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
              </Accordion>
              {attr.map((item, i) => (
                <Accordion key={i}>
                  <AccordionSummary
                    expandIcon={<IoIosArrowDown />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>{item.name}</Typography>
                  </AccordionSummary>
                  <div className="all-category">
                    {item.children?.map((value) => (
                      <label className="item" key={value.id}>
                        <FormControlLabel control={<Checkbox onClick={(e) => addToSearch(e, value)}/>} label={value.value} />
                      </label>
                    ))}
                  </div>
                </Accordion>
              ))}
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
