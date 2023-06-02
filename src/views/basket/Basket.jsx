import { Container } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/scss/_basket.scss";
import Title from "../../components/title/Title";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import { Button } from "@mui/material";
import BasketModal from "../../components/modal/BasketModal";
import { useDispatch, useSelector } from "react-redux";
import BasketCart from "./BasketCart";
import 'react-loading-skeleton/dist/skeleton.css'
import { deleteBasketProduct } from "../../redux/actions";
import { numberWithCommas } from "../../helper";
import { deleteCart } from "../../http/ProductAPI";

const Basket = () => {
  const carts = useSelector((state) => state.basket.filter((item) => !item.cart_status));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { basket: basketProducts } = useSelector((state) => state);
  const [openModal, setOpenModal] = useState(false);
  const totalPrice = carts.reduce((acc, item) => acc + +item?.product?.price * item.quantity, 0);
  const totalInstallmentPlan = carts.reduce((acc, item) => acc + +item?.product?.installment_plan * item.quantity, 0);
  const exchangeRate = useSelector((state) => state.app.exchange);

  const deleteCartLocal = (id) => {
    dispatch(deleteBasketProduct(id));
    deleteCart(id);
  }

  const deleteAllBaskets = () => {
    basketProducts.forEach(item => {
      dispatch(deleteBasketProduct(item.id));
      deleteCart(item.id);
    });
  }

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  return (
    <>
      <SecondNavbar />
      <BasketModal closeModal={handleCloseModal} openModal={openModal} />
      <Container maxWidth="xl">
        <div style={{minHeight: "70vh"}}>
          <Title title="Корзина" style="mt-6" />
          {carts.length > 0 ? (
          <div className="grid lg:grid-cols-12 grid-cols-6 gap-4 mb-12">
            <div className="xl:col-span-9 lg:col-span-8 col-span-6">
              {carts.map((item) => (
                  <BasketCart
                    cart={item}
                    deleteCartItem={deleteCartLocal}
                    key={item.id}
                    carts={carts}
                  />
              ))}
            </div>
            <div className="xl:col-span-3 lg:col-span-4 col-span-6">
              <div className="price-box">
                <div className="px-6">
                  <div className="text-2xl f-bold">В корзине</div>
                  <div className="mt-1">Товаров: {carts.reduce((acc, item) => acc + item.quantity, 0)}</div>
                  <div className="text-2xl f-bold mt-1">{numberWithCommas(totalPrice * exchangeRate)} Сум</div>
                </div>
                <Button
                  onClick={() => navigate("/checkout")}
                  className="yellow-btn-hover !w-full !rounded-none !text-base !py-3 f-light !my-3"
                >
                  Оформить заказ
                </Button>
                <div className="px-6">
                  <div className="text-2xl f-bold">12 месяц</div>
                  <div className="mt-1">Товаров: 0</div>
                  <div className="text-2xl f-bold mt-4">{numberWithCommas(totalInstallmentPlan * exchangeRate)} Сум</div>
                  <div className="mt-1">
                    Рассрочку можно офромить только до 15 000 000 сум
                  </div>
                </div>
                <Button
                  onClick={setOpenModal}
                  className="yellow-btn-hover !w-full !rounded-none !text-base !py-3 f-light !mt-5"
                >
                  Оформить Рассрочку
                </Button>
              </div>
              <div 
                className="text-center mt-4 underline cursor-pointer"
                onClick={deleteAllBaskets}
              >Удалить все продукты</div>
            </div>
          </div>
          ) : (
          <div 
            className="flex items-center justify-center flex-col"
            style={{height: "50vh"}}
          >
            <h2 className="text-2xl">Вы не добавили товаров в корзину</h2>
            <Link 
              style={{
                background: "rgb(254, 238, 0)",
                padding: "0.5rem 3rem",
                textDecoration: "none",
                fontSize: "1.25rem",
                cursor: "pointer"
              }}
              className="mt-6"
              to="/"
            >
              Добавить товары
            </Link>
          </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Basket;
