import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../assets/scss/_detail.scss";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Rating from "@mui/material/Rating";
import { Alert, Button, Tab, Tabs } from "@mui/material";
import { BiHeart } from "react-icons/bi";
import ImageGallery from "./ImageGallery";
// import Counter from "../../components/counter/Counter";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { appendProductToUserCart, appendProductToWishList, fetchOneProduct } from "../../http/ProductAPI";
import { connect } from "react-redux";
// import SimilarCarts from "../../components/similarCarts/SimilarCarts";

const Detail = ({ products, userId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [counter, setCounter] = useState(1);
  const [value, setValue] = useState("1");
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setProduct((() => {
      for(let i = 0;i < products.length;i++) {
        if(products[i].id == id) {
          return products[i];
        }
      }
    })());
    setLoading(false);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const minusCounter = () => {
    if (counter > 1) {
      setCounter((count) => count - 1);
    } else {

    }
  };

  const plusCounter = () => {
    setCounter((count) => count + 1);
  };

  const [rassrochkaTab, setRassrochkaTab] = useState("");
  const rassrochkaArray = [
    {
      id: 1,
      name: "6 месяц",
    },
    {
      id: 2,
      name: "9 месяц",
    },
    {
      id: 3,
      name: "12 месяц",
    },
  ];

  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading
      </div>
    );
  }

  const addProductToCart = async () => {
    try {
      await appendProductToUserCart(userId, id, counter);
    } catch (error) {
      console.log(error);
    }
  }

  const addProductToWishList = async () => {
    try {
      await appendProductToWishList(userId, id);
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <section className="detail">
      <SecondNavbar />
      <Container maxWidth="xl">
        <Alert variant="filled" className="yellow-btn-hover"></Alert>
        <div className="pages detail-page !pt-8">
          <Link to="/">Магазин /</Link>
          <Link to="/">Аксессуары /</Link>
          <div>
            {product.name}
          </div>
        </div>
        <div className="laptop-detail-name text-2xl f-medium mb-4">
          {product.name}
        </div>
        <div className="flex items-center gap-4 border-b-2">
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            size="small"
          />
          <div
            className="detail-comment-length"
            style={{ color: "rgb(181, 238, 111)" }}
          >
            (0)
          </div>
          <Button
            className="!capitalize"
            size="large"
            color="error"
            startIcon={<BiHeart size={20} />}
            onClick={addProductToWishList}
          >
            Нравится
          </Button>
          <div>
            {product.amount === 0 ? (
              <div className="text-red-600">Нет в наличии</div>
            ) : (
              <div>Есть в наличии: {product.amount}</div>
            )}
          </div>
        </div>
        <div className="grid lg:grid-cols-12 grid-cols-6 justify-between detail-box mt-8">
          <div className="xl:col-span-4 lg:col-span-6 col-span-6">
            <ImageGallery images={product.image}/>
          </div>
          <div className="xl:col-span-5 lg:col-span-6 col-span-6 character-box xl:pl-8 lg:pl-14 mb-6 lg:mt-0 mt-8">
            <div className="mobile-detail-name text-2xl f-medium mb-4">
              Acer Aspire 3 Intel Pentium N5030/4GB/500GB HDD/Intel UHD 15.6"
              (A315-34-P59K) Charcoal Black
            </div>
            <div className="text-lg f-medium">Характеристики</div>
            <div className="mt-4 flex items-center gap-x-4 gap-y-2">
              <div className="gray">Бренд:</div>
              <div>Acer</div>
            </div>
            <div className="mt-4 flex items-center gap-x-4 gap-y-2">
              <div className="gray">Процессор:</div>
              <div>Celeron N5030</div>
            </div>
            <div className="mt-4 flex items-center gap-x-4 gap-y-2">
              <div className="gray">Оперативная память:</div>
              <div>4 GB</div>
            </div>
            <div className="mt-4 flex items-center gap-x-4 gap-y-2">
              <div className="gray">Накопитель:</div>
              <div>HDD 500 GB</div>
            </div>
            <div className="mt-4 flex items-center gap-x-4 gap-y-2">
              <div className="gray">Видеокарта:</div>
              <div>Intel UHD Graphics</div>
            </div>
          </div>
          <div className="xl:col-span-3 lg:col-span-4 col-span-6 lg:col-start-4 lg:col-end-10 xl:mt-0 lg:mt-8">
            <div className="detail-payment rounded">
              <div className="p-4 border">
                <div className="text-4xl f-bold">{product.price} Сум</div>
                <div className="detail-counter grid grid-cols-3 my-4">
                  <Button onClick={minusCounter} className="minus">
                    <AiOutlineMinus size={24} fill="#C4C4C4" />
                  </Button>
                  <div className="count">{counter}</div>
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
                  Добавить в корзину
                </Button>
                <div className="text-4xl f-bold my-5">{product.installment_plan}</div>
                <Button
                  onClick={() => navigate("/basket")}
                  className="yellow-btn-hover !w-full !py-3 !capitalize !text-base"
                >
                  Купить В Рассрочку
                </Button>
              </div>
              <div className="grid grid-cols-3">
                {rassrochkaArray.map((item) => (
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
                ))}
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
          <Tab value="1" label="Oписание" />
          <Tab value="2" label="Характеристики" />
        </Tabs>
        {value === "1" && (
          <div className="p-6">
            {product.description}
            {/* <div className="f-bold mb-2" style={{ fontSize: "15px" }}>
              Мощный процессор
            </div>
            <div className="mb-2" style={{ fontSize: "15px" }}>
              Воспроизводите видео быстро и без задержек, просматривайте
              веб-страницы или выполняйте рабочие задачи благодаря процессору и
              видеокарте от Intel®. Такое сочетание и память гарантируют более
              высокую скорость загрузки приложений, качественную графику и
              эффективную работу в режиме многозадачности.
            </div>
            <div className="f-bold mb-2" style={{ fontSize: "15px" }}>
              Мощный процессор
            </div>
            <div className="mb-2" style={{ fontSize: "15px" }}>
              Воспроизводите видео быстро и без задержек, просматривайте
              веб-страницы или выполняйте рабочие задачи благодаря процессору и
              видеокарте от Intel®. Такое сочетание и память гарантируют более
              высокую скорость загрузки приложений, качественную графику и
              эффективную работу в режиме многозадачности.
            </div> */}
          </div>
        )}
        {value === "2" && (
          <div className="p-6">
            {/* <div className="mb-4" style={{ fontSize: "15px" }}>
              Процессор: Intel® Pentium N5030
            </div>
            <div className="mb-4" style={{ fontSize: "15px" }}>
              Тех. процесс: 10 нм
            </div>
            <div className="mb-4" style={{ fontSize: "15px" }}>
              Количество ядер: 4
            </div>
            <div className="mb-4" style={{ fontSize: "15px" }}>
              Частота процессора: 1.10-3.30 ГГц
            </div> */}
            {product.detail}
          </div>
        )}
      </Container>
      {/* <SimilarCarts /> */}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products,
    userId: state.user.userId
  }
} 

export default connect(mapStateToProps, null)(Detail);
