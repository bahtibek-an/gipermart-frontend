import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/scss/_basket.scss";
import Title from "../../components/title/Title";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import { Button } from "@mui/material";
import BasketModal from "../../components/modal/BasketModal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBasketCarts } from "../../http/ProductAPI";
import BasketCart from "./BasketCart";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import { deleteBasketProduct } from "../../redux/actions";
// import { removeRepeatItems } from "../../helper";

const Basket = () => {
  const carts = useSelector((state) => state.basket);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const userId = useSelector(state => state.user.userId);
  const totalPrice = carts.reduce((acc, item) => acc + +item.total, 0);

  const deleteCart = (id) => {
    dispatch(deleteBasketProduct(carts, id));
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
        <Title title="Корзина" style="mt-6" />
        <div className="grid lg:grid-cols-12 grid-cols-6 gap-4 mb-12">
          <div className="xl:col-span-9 lg:col-span-8 col-span-6">
            {carts.map((item) => (
              <BasketCart cart={item} deleteCartItem={deleteCart} key={item.id}/>
            ))}
          </div>
          <div className="xl:col-span-3 lg:col-span-4 col-span-6">
            <div className="price-box">
              <div className="px-6">
                <div className="text-2xl f-bold">В корзине</div>
                <div className="mt-1">Товаров: 5</div>
                <div className="text-2xl f-bold mt-1">{totalPrice} Сум</div>
              </div>
              <Button
                onClick={() => navigate("/checkout")}
                className="yellow-btn-hover !w-full !rounded-none !text-base !py-3 f-light !my-3"
              >
                Оформить заказ
              </Button>
              <div className="px-6">
                <div className="text-2xl f-bold">12 месяц</div>
                <div className="mt-1">Товаров: 5</div>
                <div className="text-2xl f-bold mt-4">2 018 800 Сум</div>
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
          </div>
        </div>
      </Container>
    </>
  );
};

export default Basket;
