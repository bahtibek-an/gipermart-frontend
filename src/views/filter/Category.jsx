import React, { useEffect, useState, useRef } from "react";
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
import LoadingCart from "../../components/cart/LoadingCart";
import Select from "../../components/select/Select";
import Accordion from "../../components/accordion/accordion";
import AccordionSummary from "../../components/accordion-summary";
import {CurensyIcon} from "../../components/icons/curensy-icon";
import Input from "../../components/input";
import $host from "../../http";
import {numberWithCommas} from "../../helper";

function sortCategory(state, categoryId) {
    const currentCategory = state.categories?.find((item) => item?.id == categoryId);
    if(!currentCategory.parent) {
        for(let i = 0;i < state.categories.length;i++) {
            const item = state.categories[i];
            if(item.parent) {
                for(let j = 0;j < item.children.length;j++) {
                    if(item.children[j].id == categoryId) {
                        return item;
                    }
                }
            }
        }
    }
    return currentCategory;
}

const Category = () => {
    const { categoryId } = useParams();
    const category = useSelector((state) => sortCategory(state, categoryId));
    const categoryItem = useSelector((state) => state.categories?.find((item) => item?.id == categoryId));
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
    const [ filterPriceRange, setFilterPriceRange ] = useState([0, 100]);
    const exchangeRate = useSelector((state) => state.app.exchange);
    const navigate = useNavigate();
    const slider = useRef();

    const didMountRef = useRef(false);

    const fetchAttributes = async () => {
        const { data: filters } = await $host.get(`product/categories-filter/${ categoryId }/`);
        setColors(filters.color);
        setBrands(filters.brands);
        setProductRange({
            min: filters.min_price,
            max: filters.max_price
        });
    }

    const fetchProducts = async () => {
      const brand = brandParams.map((item) => item.brand_id);
      const color = colorParams.map((item) => item.color_id);
      const min = (filterPriceRange[0] / 100) * productRange.max;
      const max = (filterPriceRange[1] / 100) * productRange.max;
      const limit = 24;
      const offset = 0;
        const { data } = await $host.get(`product/product_filter/`, {
            params: {
                search: categoryItem.slug,
                ordering: sortType,
                limit: limit,
                offset: offset,
                brand: brand,
                color: color,
                min_price: min,
                max_price: max
            }
        });
      const results = data.results;
      setProducts(results);
      return data.results;
    }

    const handleChangePriceFilter = (event, newValue) => {
        setFilterPriceRange(newValue);
    }

    useEffect(() => {
      if (didMountRef.current) {
        setLoading(true);
        fetchProducts()
          .then(() => setLoading(false));
        return;
      }
      didMountRef.current = true;
    }, [searchParams, 
      sortType, 
      brandParams, 
      colorParams, 
      filterPriceRange
    ]);



    const fetchAttrAndProducts = async () => {
      setLoading(true)
      const data = await fetchAttributes();
      await fetchProducts(data);
      setLoading(false);
    }

    useEffect(() => {
      fetchAttrAndProducts();
    }, [categoryId]);

    useEffect(() => {
        slider.current.style.color = '#feee00'
        slider.current.querySelector('.MuiSlider-rail').style.color = '#ccc'
    }, []);

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
                  {category?.children?.map((item) => item.id != categoryId && (
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
                  {<AccordionDefault>
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
                                      label={item.brand__name} />
                              </label>
                          ))}
                      </div>
                  </AccordionDefault>}
                 {<AccordionDefault>
                      <AccordionSummaryDefault
                          expandIcon={<IoIosArrowDown />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                      >
                          <Typography>Цвет</Typography>
                      </AccordionSummaryDefault>
                      <div className="all-category">
                          {!category.parent && colors.map((item, index) => (
                              <label className="item" key={index}>
                                  <FormControlLabel
                                      control={
                                          <Checkbox
                                              onClick={(e) => addToColorParams(e, item)}
                                          />
                                      }
                                      label={item.color__color} />
                              </label>
                          ))}
                      </div>
                  </AccordionDefault>}
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
                              <Box sx={{ width: "100%", padding: "0 10px" }}>
                                <Slider
                                    ref={slider}
                                  valueLabelDisplay="auto"
                                  scale={(value) => Math.floor(((value / 100) * productRange.max))}
                                  value={filterPriceRange}
                                  getAriaValueText={(value) => `${value}Сум`}
                                  valueLabelFormat={(value) => `${numberWithCommas(value * exchangeRate)} Сум`}
                                  onChange={handleChangePriceFilter}
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
                                      value={Math.floor(((filterPriceRange[0] / 100) * productRange.max))}
                                      type="number"
                                      onChange={(e) => {
                                          setFilterPriceRange(prev => [e.target.value / productRange.max, prev[1]])
                                      }}
                                  />
                                  <Input
                                      style={{flex: "1"}}
                                      startAdornment={
                                          <InputAdornment position="start">
                                              <CurensyIcon />
                                          </InputAdornment>
                                      }
                                      value={Math.floor(((filterPriceRange[1] / 100) * productRange.max))}
                                      type="number"
                                      // onChange={(e) => handleChangePriceFilter(e, "max")}
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
