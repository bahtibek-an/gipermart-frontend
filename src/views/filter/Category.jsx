import React, { useEffect, useState } from "react";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Typography from "@mui/material/Typography";
import { IoIosArrowDown } from "react-icons/io";
import { Container } from "@mui/system";
import "../../assets/scss/_filter.scss";
import { Link, useParams } from "react-router-dom";
import {Accordion as AccordionDefault, FormControlLabel, MenuItem, Stack, AccordionDetails, InputAdornment, AccordionSummary as AccordionSummaryDefault, Pagination, PaginationItem} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Title from "../../components/title/Title";
import Cart from "../../components/cart/Cart";
import { useSelector } from "react-redux";
import { fetchFilterProducts } from "../../http/ProductAPI";
import { sortFilterCategories } from "../../helper";
import LoadingCart from "../../components/cart/LoadingCart";
import Select from "../../components/select/Select";
import Accordion from "../../components/accordion/accordion";
import AccordionSummary from "../../components/accordion-summary";
import {CurensyIcon} from "../../components/icons/curensy-icon";
import Input from "../../components/input";

const Category = () => {
    const { categoryId } = useParams();
    const category = useSelector((state) => state.categories?.find((item) => item?.id == categoryId))
    const [ products, setProducts ] = useState([]);
    const [ attr, setAttr ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ searchParams, setSearchParams ] = useState([]);
    const [ sortType, setSortType ] = useState("price");
    const [productRange, setProductRange] = useState({ min: 0, max: 0 });
    const [ filterPriceRange, setFilterPriceRange ] = useState({ min: productRange.min, max: productRange.max });
    const fetchAttributes = async (products) => {
      const attributes = [];
      const map = {};
      products.forEach((item, i) => {
        return item.attributes?.forEach((attr, j) => {
          if(map[item.attribute_values[j]] !== undefined) {
            return;
          }
          map[item.attribute_values[j]] = attr;
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
      const data = await fetchFilterProducts(param, category.slug, sortType, filterPriceRange);
      const results = data.results;
      setProducts(results);
      const productPrices = results?.map((item) => +(item?.price)) || [0, 0];
      setProductRange({min: Math.min(...productPrices), max: Math.max(...productPrices)});
      return data.results;
    }

    const handleChangePriceFilter = (event, type) => {
        const price = +event.target.value;
        if (type === "min") {
            // if (price < productRange.min || price > productRange.max) {
            //     return;
            // }
            setFilterPriceRange(prev => ({...prev, min: price}));
        } else if (type === "max") {
            // if(price > productRange.max || price < productRange.min) {
            //     return;
            // }
            setFilterPriceRange(prev => ({...prev, max: price}));
        }
    }

    useEffect(() => {
      setLoading(true);
      fetchProducts()
        .then(() => setLoading(false));
    }, [searchParams, sortType]);

    useEffect(() => {
      setLoading(true)
      fetchProducts()
        .then((data) => fetchAttributes(data))
        .then(() => setLoading(false));
    }, [categoryId]);

    // useEffect(() => {
    //     const sortedProducts = () => {
    //
    //     }
    // }, [filterPriceRange]);

    const addToSearch = (e, data) => {
      const checked = e.target.checked;
      if(checked) {
        return setSearchParams((prev) => [...prev, data]);
      }
      return setSearchParams((prev) => prev.filter((item) => item.id != data.id));
    }
    
    return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <div style={{minHeight: "70vh"}}>
          <div className="grid lg:grid-cols-12 grid-cols-6 gap-4 filter my-12" >
            <div className="lg:col-span-3 col-span-6">
              <div>
                <AccordionDefault className="all-category">
                  <AccordionSummaryDefault
                    expandIcon={<IoIosArrowDown />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>Все категории</Typography>
                  </AccordionSummaryDefault>
                  {category?.children?.map((item) => (
                      <Link to={`/category/${item.id}`} key={item.id} className="item">
                          {item.name}
                      </Link>
                  ))}
                </AccordionDefault>
                {attr.map((item, i) => (
                  <AccordionDefault key={i}>
                    <AccordionSummaryDefault
                      expandIcon={<IoIosArrowDown />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>{item.name}</Typography>
                    </AccordionSummaryDefault>
                    <div className="all-category">
                      {item.children?.map((value) => (
                        <label className="item" key={value.id}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                onClick={(e) => addToSearch(e, value)}
                              />
                              }
                              label={value.value} />
                        </label>
                      ))}
                    </div>
                  </AccordionDefault>
                ))}
                <Stack sx={{ padding: '1rem 0' }} gap={2}>
                  <Select
                    value={sortType}
                    onChange={(e) =>
                      setSortType(e.target.value)
                    }
                    placeholder="Сортировка"
                >
                    <MenuItem value={"price"}>
                      Сначала по дешевле
                    </MenuItem>
                    <MenuItem value={"-price"}>
                      Сначала по дороже
                    </MenuItem>
                  </Select>
                </Stack>
                  <Stack>
                      <Accordion sx={{ border: '1px solid #e5e5e5' }}>
                          <AccordionSummary>
                              <Typography
                              >Цена</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Stack alignItems="center" gap={2} direction="row">
                                  <Input
                                      style={{flex: "1"}}
                                      startAdornment={
                                          <InputAdornment position="start">
                                              <CurensyIcon />
                                          </InputAdornment>
                                      }
                                      value={filterPriceRange.min}
                                      type="number"
                                      onChange={(e) => handleChangePriceFilter(e, "min")}
                                      // size="small"
                                  />
                                  <Input
                                      style={{flex: "1"}}
                                      startAdornment={
                                          <InputAdornment position="start">
                                              <CurensyIcon />
                                          </InputAdornment>
                                      }
                                      value={filterPriceRange.max}
                                      type="number"
                                      onChange={(e) => handleChangePriceFilter(e, "max")}
                                      // size="small"
                                  />
                              </Stack>
                          </AccordionDetails>
                      </Accordion>
                  </Stack>
              </div>
            </div>
            <div className="lg:col-span-9 col-span-6">
              <Title title={category.name} style="f-medium mb-4" />
              <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-2">
                {loading ? (
                  [1, 2, 3].map((i) => (
                    <LoadingCart key={i}/>
                  ))
                ) : (
                  products.map((item) => (
                    <Cart cart={item} key={item.id}/>
                  ))
                )}
              </div>
              {!loading && products.length === 0 && (
                <div className="mt-8 flex justify-center">
                    <h1 className="text-2xl">Ничего не найдено</h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Category;
