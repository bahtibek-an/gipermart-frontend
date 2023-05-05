import { Container } from "@mui/system";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import "../../assets/scss/_profile.scss";
import { CgFileDocument } from "react-icons/cg";
import Title from "../../components/title/Title";
import {
  Button,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import DialogUpdateForm from "./components/DialogUpdateUserForms/DialogUpdateForm";
import {setCookie} from "../../helper";
import {store} from "../../index";
import {deleteBasketProduct, deleteUser, deleteWishList} from "../../redux/actions";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [openModal, setOpenModal] = useState(false);
  const { basket, wishLists } = useSelector((state) => state)

  const dispatch = useDispatch();

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const deletaAllWishlists = () => {
    wishLists.forEach((item) => {
      dispatch(deleteWishList(item.product.id));
    })
  }

  const deleteAllBaskets = () => {
    basket.forEach(item => {
      dispatch(deleteBasketProduct(item.id));
    });
  }

  const logout = () => {
    localStorage.removeItem("accessToken");
    setCookie("refreshToken", "", 0);
    store.dispatch(deleteUser());
    deleteAllBaskets();
    deletaAllWishlists();
  }

  return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <div className="pages">
          <Link to="/">Магазин /</Link>
          <div>Личный кабинет</div>
        </div>
        <div className="grid xl:grid-cols-12 lg:grid-cols-4 gap-12">
          <div className="xl:col-span-4 lg:col-span-2">
            <div className="user-sidebar">
              <div
                onClick={() => navigate("/profile")}
                className={`item ${pathName === "/profile" && "active"}`}
              >
                <CgFileDocument color="#2E3A59" size={24} />
                Персональные данные
              </div>
              <div
                onClick={() => navigate("/profile/order")}
                className={`item ${pathName === "/profile/order" && "active"}`}
              >
                <CgFileDocument color="#2E3A59" size={24} />
                Мои заказы
              </div>
              <div
                onClick={() => navigate("/profile/addresses")}
                className={`item ${
                  pathName === "/profile/addresses" && "active"
                }`}
              >
                <CgFileDocument color="#2E3A59" size={24} />
                Адреса
              </div>
              <div onClick={() => navigate("/favorites")} className="item">
                <CgFileDocument color="#2E3A59" size={24} />
                Избранные товары
              </div>
            </div>
          </div>
          <div className="xl:col-span-8 lg:col-span-4">
            <Title title="Персональные данные" style="f-medium" />
            <div className="grid lg:grid-cols-6 gap-x-4 lg:gap-y-0 gap-y-1 mt-8">
              <div>ID пользователя:</div>
              <div
                className="col-span-4 flex items-center justify-center h-px bg-black m-auto"
                style={{ width: "-webkit-fill-available" }}
              ></div>
              <div>{user.id}</div>
            </div>
            <div className="grid lg:grid-cols-6 gap-x-4 lg:gap-y-0 gap-y-1 mt-8">
              <div>Имя и фамилия:</div>
              <div
                className="col-span-4 flex items-center justify-center h-px bg-black m-auto"
                style={{ width: "-webkit-fill-available" }}
              ></div>
              <div>{user.first_name} {user.last_name}</div>
            </div>
            <div className="grid lg:grid-cols-6 gap-x-4 lg:gap-y-0 gap-y-1 mt-8">
              <div>Номер телефона:</div>
              <div
                className="col-span-4 flex items-center justify-center h-px bg-black m-auto"
                style={{ width: "-webkit-fill-available" }}
              ></div>
              <div>{user.phone_number}</div>
            </div>
            <div className="grid lg:grid-cols-6 gap-x-4 lg:gap-y-0 gap-y-1 mt-8">
              <div>Текущий пароль:</div>
              <div
                className="col-span-4 flex items-center justify-center h-px bg-black m-auto"
                style={{ width: "-webkit-fill-available" }}
              ></div>
              <div>********</div>
            </div>
            <div className="flex items-center justify-between">
              <Button
                color="error"
                size="large"
                className="!my-6"
                style={{ color: "#e44542" }}
                onClick={handleClickOpenModal}
              >
                Изменить
              </Button>
              <Button
                color="error"
                size="large"
                className="!my-6"
                onClick={() => {
                  logout()
                  navigate("/")
                }}
                style={{ color: "#e44542" }}
              >
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </Container>
      <div>
        <DialogUpdateForm 
          handleCloseModal={handleCloseModal} 
          openModal={openModal}
        />
      </div>
      <div>
      </div>
    </>
  );
};

export default Profile;
