import React, { useEffect, useState } from "react";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Typography from "@mui/material/Typography";
import { IoIosArrowDown } from "react-icons/io";
import { Container } from "@mui/system";
import "../../assets/scss/_filter.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import {Accordion as AccordionDefault, FormControlLabel, MenuItem, Stack, AccordionDetails, InputAdornment, AccordionSummary as AccordionSummaryDefault, Pagination, PaginationItem, Slider, Box, styled} from "@mui/material";
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
import $host from "../../http";

const Category = () => {
    const { categoryId } = useParams();
    const category = useSelector((state) => state.categories?.find((item) => item?.id == categoryId))
    const [ products, setProducts ] = useState([]);
    const [ attr, setAttr ] = useState({});
    const [ brands, setBrands ] = useState([]);
    const [ brandParams, setBrandParams ] = useState([]);
    const [ colors, setColors ] = useState([]);
    const [ colorParams, setColorParams ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ searchParams, setSearchParams ] = useState([]);
    const [ sortType, setSortType ] = useState("price");
    const [productRange, setProductRange] = useState({ min: 0, max: 0 });
    const [ filterPriceRange, setFilterPriceRange ] = useState({ min: productRange.min, max: productRange.max });
    const navigate = useNavigate();

    const fetchAttributes = async () => {
        const { data: filters } = await $host.get(`product/categories-filter/${ categoryId }/`);
        function groupByAttribute(data) {
            const result = {};
            data.forEach((item) => {
                const attributeName = item.product_attribute__name;
                const attributeValue = item.attribute_value;
                const attributeId = item.id;
                if (!result[attributeName]) {
                    result[attributeName] = [];
                }
                result[attributeName].push({ id: attributeId, value: attributeValue });
            });
            return result;
        }
        setColors(filters.colors);
        setBrands(filters.brands);
        setAttr(groupByAttribute(filters.attribute_values));
    }

    const fetchProducts = async () => {
      const param = searchParams.map((item) => `attribute_values=${item.id}`).join('&');
      const brand = brandParams.map((item) => `brand=${item.id}`).join('&');
      const color = colorParams.map((item) => `colors=${item.id}`).join('&');
      const data = await fetchFilterProducts(param, category?.slug, sortType, filterPriceRange, brand, color);
      const results = data.results;
      setProducts(results);
      const productPrices = results?.map((item) => +(item?.price)) || [0, 0];
      setProductRange({min: Math.min(...productPrices), max: Math.max(...productPrices)});
      return data.results;
    }

    const handleChangePriceFilter = (event, type) => {
        const price = +event.target.value;
        if (type === "min") {
            setFilterPriceRange(prev => ({...prev, min: price}));
        } else if (type === "max") {
            setFilterPriceRange(prev => ({...prev, max: price}));
        }
    }

    useEffect(() => {
      setLoading(true);
      fetchProducts()
        .then(() => setLoading(false));
    }, [searchParams, sortType, brandParams, colorParams]);

    useEffect(() => {
      setLoading(true)
      fetchProducts()
        .then((data) => fetchAttributes(data))
        .then(() => setLoading(false));
    }, [categoryId]);

    const CustomSlider = styled(Slider)({
      color: "#feee00",
      '& .MuiSlider-rail': {
        color: "#ccc"
      }
    });

    const addToSearch = (e, data) => {
      const checked = e.target.checked;
      if(checked) {
        return setSearchParams((prev) => [...prev, data]);
      }
      return setSearchParams((prev) => prev.filter((item) => item.id !== data.id));
    }

    const addToBrandParams = (e, data) => {
        const checked = e.target.checked;
        if(checked) {
            return setBrandParams((prev) => [...prev, data]);
        }
        return setBrandParams((prev) => prev.filter((item) => item.id !== data.id));
    }

    const addToColorParams = (e, data) => {
        const checked = e.target.checked;
        if(checked) {
            return setColorParams((prev) => [...prev, data]);
        }
        return setColorParams((prev) => prev.filter((item) => item.id !== data.id));
    }

    if(!category) {
      return navigate("/404", { replace: true });
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
                {Object.keys(attr).map((item, i) => (
                  <AccordionDefault key={i}>
                    <AccordionSummaryDefault
                      expandIcon={<IoIosArrowDown />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>{item}</Typography>
                    </AccordionSummaryDefault>
                    <div className="all-category">
                      {attr[item].map((value, j) => (
                        <label className="item" key={j}>
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
                  <AccordionDefault>
                      <AccordionSummaryDefault
                          expandIcon={<IoIosArrowDown />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                      >
                          <Typography>Бренд</Typography>
                      </AccordionSummaryDefault>
                      <div className="all-category">
                          {brands.map((item, index) => (
                              <label className="item" key={index}>
                                  <FormControlLabel
                                      control={
                                          <Checkbox
                                              onClick={(e) => addToBrandParams(e, item)}
                                          />
                                      }
                                      label={item.name} />
                              </label>
                          ))}
                      </div>
                  </AccordionDefault>
                  <AccordionDefault>
                      <AccordionSummaryDefault
                          expandIcon={<IoIosArrowDown />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                      >
                          <Typography>Цвет</Typography>
                      </AccordionSummaryDefault>
                      <div className="all-category">
                          {colors.map((item, index) => (
                              <label className="item" key={index}>
                                  <FormControlLabel
                                      control={
                                          <Checkbox
                                              onClick={(e) => addToColorParams(e, item)}
                                          />
                                      }
                                      label={item.color} />
                              </label>
                          ))}
                      </div>
                  </AccordionDefault>
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
                      <Accordion expanded={true} sx={{ border: '1px solid #e5e5e5' }}>
                          <AccordionSummary>
                              <Typography
                              >Цена</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                              <Box sx={{ width: "100%", padding: "0 20px" }}>
                                <CustomSlider
                                  valueLabelDisplay="auto" 
                                  getAriaLabel={() => 'Temperature range'}
                                  value={[20, 37]}
                                  getAriaValueText={(value) => `${value}Сум`}
                                  // onChange={}
                                  // marks={[
                                  //   {
                                  //     value: 0,
                                  //     label: '0',
                                  //   },
                                  //   {
                                  //     value: 100,
                                  //     label: '10032321432',
                                  //   },
                                  // ]}
                                />
                              </Box>
                              <Stack alignItems="center" gap={2} direction="row" className="mt-4">
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
