import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/scss/_detail.scss";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Rating from "@mui/material/Rating";
import { Button, Tab, Tabs } from "@mui/material";
import { BiHeart, BiHeartCircle } from "react-icons/bi";
import ImageGallery from "./ImageGallery";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { appendProductToUserCart, appendProductToWishList, fetchOneProduct, deleteProductFromWishList } from "../../http/ProductAPI";
import { connect, useDispatch, useSelector } from "react-redux";
import { craeteWishListProduct, createBasketProduct, deleteWishList, showRightModal } from "../../redux/actions";
import Spinner from "../../UI/spinner/Spinner";
import { createRatingProduct } from "./http";
import { numberWithCommas } from "../../helper";
import SimilarCarts from "../../components/similarCarts/SimilarCarts";

const Detail = ({ products, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [value, setValue] = useState("1");
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const favorite = useSelector((state) => state?.wishLists.find((item) => item?.product?.id == productDetail?.id));
  const hasInProduct = useSelector((state) => state.basket?.find((item) => item?.product?.id == productDetail?.id));
  const [counter, setCounter] = useState(1);
  const exchangeRate = useSelector((state) => state.app.exchange);
  const productPrice = (+productDetail.price * counter);
  const productInstallmentPrice = (+productDetail.installment_plan * counter);
  const category = useSelector((state) => state.categories.find(item => item.id === productDetail.category));

  const fetchProduct = async () => {
    const product = await fetchOneProduct(id);
    setProductDetail(product);
    setLoading(false);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const minusCounter = () => {
    if (counter > 1) {
      setCounter((count) => count - 1);
    }
  };

  const plusCounter = () => {
    setCounter((count) => count + 1);
  };

  // const [rassrochkaTab, setRassrochkaTab] = useState("");
  // const rassrochkaArray = [
  //   {
  //     id: 1,
  //     name: "6 месяц",
  //   },
  //   {
  //     id: 2,
  //     name: "9 месяц",
  //   },
  //   {
  //     id: 3,
  //     name: "12 месяц",
  //   },
  // ];


  const addProductToCart = async () => {
    if(!user.isAuth) {
      return dispatch(showRightModal());
    }
    if(hasInProduct) {
      return navigate("/basket");
    }
    try {
      const data = await appendProductToUserCart(user?.user?.id, id, counter, productPrice);
      dispatch(createBasketProduct(data));
    } catch (error) {
      console.log(error);
    }
  }

  const addProductToWishList = async () => {
    if(!user.isAuth) {
      return dispatch(showRightModal());
    }
    try {
      if(favorite) {
        return deleteProductFromWishList(favorite.id)
        .then(() => {
          dispatch(deleteWishList(productDetail?.id));
        });
      }
      return appendProductToWishList(user?.user?.id, productDetail?.id)
        .then((data) => {
          dispatch(craeteWishListProduct(data));
        });
    } catch (error) {
      console.log(error); 
    }
  }

  const createRating = async (newValue) => {
    const data = await createRatingProduct({
      rating: Math.floor(newValue),
      product: productDetail.id
    });
    return data;
  }

  useEffect(() => {
    setLoading(true);
    fetchProduct()
  }, [id]);

  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen">
         <Spinner />
      </div>
    );
  }


  return (
    <section className="detail">
      <SecondNavbar />
      <Container maxWidth="xl">
        
        <div className="pages detail-page !pt-8">
          <Link to="/">Магазин /</Link>
          <Link to={`/category/${category?.id}`}>{category?.name} /</Link>
          <div>
            {productDetail.title_ru}
          </div>
        </div>
        <div className="laptop-detail-name text-2xl f-medium mb-4">
          {productDetail.title_ru}
        </div>
        <div className="flex items-center gap-4 border-b-2">
          <Rating
            onChange={(event, newValue) => {
              createRating(newValue)
            }}
            name="half-rating"
            defaultValue={productDetail.rating}
            precision={0.5}
            size="small"
          />
          <div
            className="detail-comment-length"
            style={{ color: "rgb(181, 238, 111)" }}
          >
            ({productDetail.rating.toFixed(1)})
          </div>
          <Button
            className="!capitalize"
            size="large"
            color="error"
            startIcon={!favorite ? <BiHeart size={20} /> : <BiHeartCircle size={20}/>}
            onClick={addProductToWishList}
          >
            {!favorite ? "Нравится" : "Не нравится"}
          </Button>
          <div>
            {/* {product.amount === 0 ? (
              <div className="text-red-600">Нет в наличии</div>
            ) : (
              <div>Есть в наличии: {product.amount}</div>
            )} */}
          </div>
        </div>
        <div className="grid lg:grid-cols-12 grid-cols-6 justify-between detail-box mt-8">
          <div className="xl:col-span-4 lg:col-span-6 col-span-6">
            <ImageGallery product={productDetail}/>
          </div>
          <div className="xl:col-span-5 lg:col-span-6 col-span-6 character-box xl:pl-8 lg:pl-14 mb-6 lg:mt-0 mt-8">
            <div className="mobile-detail-name text-2xl f-medium mb-4">
              Acer Aspire 3 Intel Pentium N5030/4GB/500GB HDD/Intel UHD 15.6"
              (A315-34-P59K) Charcoal Black
            </div>
            <div className="text-lg f-medium">Характеристики</div>
            {productDetail.attribute_values?.map((item, i) => (
              <div className="mt-4 flex items-center gap-x-4 gap-y-2" key={i}>
                <div className="gray">{item.product_attribute?.name}:</div>
                <div>{item.attribute_value}</div>
              </div>
            ))}
          </div>
          <div className="xl:col-span-3 lg:col-span-4 col-span-6 lg:col-start-4 lg:col-end-10 xl:mt-0 lg:mt-8">
            <div className="detail-payment rounded">
              <div className="p-4 border">
                <div className="text-4xl f-bold">{numberWithCommas(productPrice * exchangeRate)} Сум</div>
                <div className="detail-counter grid grid-cols-3 my-4">
                  <Button onClick={minusCounter} className="minus">
                    <AiOutlineMinus size={24} fill="#C4C4C4" />
                  </Button>
                  <div className="count">
                    {counter}
                  </div>
                  <Button onClick={plusCounter} className="plus">
                    <AiOutlinePlus size={24} fill="#C4C4C4" />
                  </Button>
                </div>
                <Button
                  // onClick={() => navigate("/basket")}
                  onClick={() => addProductToCart()}
                  className="yellow-btn-hover !w-full !py-3 !capitalize !text-base"
                  endIcon={<HiOutlineShoppingCart size={16} />}
                >
                  {!hasInProduct ? "Добавить в корзину" : "Корзина"}
                </Button>
                <div className="mt-5 text-2xl">
                  Цена рассрочки:
                </div>
                <div className="text-4xl f-bold mb-4">{numberWithCommas(productInstallmentPrice * exchangeRate)} Сум</div>
              </div>
              <div className="grid grid-cols-3">
                {/* {rassrochkaArray.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => setRassrochkaTab(item.id)}
                    className={`f-regular !border-t ${
                      item.id === rassrochkaTab && "active"
                    }`}
                    size="large"
                    color="warning"
                  >
                    {item.name}
                  </Button>
                ))} */}
              </div>
            </div>
          </div>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          className="!mt-10"
          aria-label="secondary tabs example"
        >
          <Tab value="1" label="Характеристики" />
        </Tabs>
        {value === "1" && (
          <div className="p-6">
            <pre className="text-lg" style={{ fontFamily: "unset" }}>
              {productDetail.descriptions}
            </pre>
          </div>
        )}
      </Container>
      <SimilarCarts category={productDetail?.category}/>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state?.products,
    user: state?.user,
  }
} 

export default connect(mapStateToProps, null)(Detail);
