import React, { useState } from "react";
import { Container } from "@mui/system";
import "../../assets/scss/_navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlinePhone } from "react-icons/md";
import { HiBars3 } from "react-icons/hi2";
import { SlPlane } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import {
  Badge,
  Drawer,
  IconButton,
} from "@mui/material";
import NavbarCatalog from "../../components/modal/NavbarCatalog";
import { IoMdClose } from "react-icons/io";
import { GrCatalogOption } from "react-icons/gr";
import { BsBagCheck, BsQuestionCircle } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { BiMapAlt, BiMailSend } from "react-icons/bi";
import { SlScreenSmartphone } from "react-icons/sl";
import MobileNavbar from "./MobileNavbar";
import NavbarSearch from "./NavbarSearch";
import AuthSidebar from "./Auth/AuthSidebar";
import { connect } from "react-redux";


const Navbar = ({ isAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [navbarFixed, setNavbarFixed] = useState(false);
  const handleScrollNavbar = () => {
    if (window.scrollY >= 40) {
      setNavbarFixed(true);
    } else {
      setNavbarFixed(false);
    }
  };
  window.addEventListener("scroll", handleScrollNavbar);
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [rightModal, setRightModal] = useState(false);
  const [leftModal, setLeftModal] = useState(false);
  const [rightModalStep, setRightModalStep] = useState("1");

  return (
    <>
      <NavbarCatalog openModal={openModal} closeModal={handleCloseModal} />
      <div>
        <Drawer
          anchor="left"
          open={leftModal}
          onClose={() => {
            setLeftModal(false);
          }}
        >
          <div>
            <div className="text-sm flex items-center justify-end px-3 py-1">
              <IconButton
                onClick={() => {
                  setLeftModal(false);
                }}
              >
                <IoMdClose size={24} />
              </IconButton>
              <div
                className="flex items-center ml-auto"
                onClick={() => {
                  setRightModal(true);
                }}
              >
                <div className="underline underline-offset-1">Войти </div>
                <div className="px-1">/</div>
                <div className="underline underline-offset-1">
                  Зарегистрироваться
                </div>
              </div>
            </div>
            <div
              onClick={() => setOpenModal(true)}
              className="py-2"
              style={{ background: "#f5f5f6" }}
            >
              <div className="flex items-center gap-x-3 px-4 py-3 bg-white">
                <GrCatalogOption color="#feee00" size={24} />
                Каталог
              </div>
            </div>
            <Link
              to="/profile/order"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <BsBagCheck size={24} />
              Мои заказы
            </Link>
            <Link
              to="/favorites"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <BiHeart size={24} />
              Избранное
            </Link>
            <Link
              to=""
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <CiLocationOn size={24} />
              Город: Ташкент
            </Link>
            <Link
              to=""
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <BiMapAlt size={24} />
              Пункты выдачи
            </Link>
            <Link
              to=""
              onClick={() => setLeftModal(false)}
              className="border-b flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <BsQuestionCircle size={24} />
              Часто задаваемые вопросы
            </Link>
            <Link
              to=""
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <BiMailSend size={24} />
              Связаться с нами
            </Link>
            <Link
              to=""
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <SlScreenSmartphone size={24} />
              Приложение Name
            </Link>
          </div>
        </Drawer>
      </div>
      <div className="drawer-modal">
        <>
          <Drawer
            anchor={"right"}
            open={rightModal}
            onClose={() => {
              setRightModal(false);
              setRightModalStep("1");
            }}
          >
            <AuthSidebar 
              rightModalStep={rightModalStep} 
              setRightModalStep={setRightModalStep}
              setRightModal={setRightModal}
            />
          </Drawer>
        </>
      </div>
      <div className="navbar-height">
        <nav className="navbar">
          <div className={`navbar-top ${navbarFixed && "fix"}`}>
            <Container maxWidth="xl">
              <div className="flex justify-end items-center gap-x-6">
                <Link to="" className="">
                  Поддержка
                </Link>
                <Link to="+998900511676" className="flex items-center gap-x-3">
                  <MdOutlinePhone size={24} />
                  +998 90 051 16 76
                </Link>
              </div>
            </Container>
          </div>
          <div
            className="navbar-bottom"
            style={{
              background: `${
                pathName !== "/" ? "rgb(252, 252, 252)" : "rgb(255, 255, 255)"
              }`,
            }}
          >
            <Container maxWidth="xl">
              <div className="grid grid-cols-10 nav-grid">
                <div className="bottom-left grid grid-cols-10 gap-x-2">
                  <Link className="block logo-block" to="/">
                    <img
                      className="navbar-logo"
                      src="../logoo.svg"
                      alt="LOGO"
                    />
                  </Link>
                  <div className="pr-4 pl-2 catalog-block">
                    <div
                      onClick={handleClickOpenModal}
                      className="catalog-btn hover:!shadow-lg cursor-pointer flex gap-x-3 items-center justify-center h-full"
                    >
                      <HiBars3 size={24} />
                      <div className="mobile-hidden-text">Каталог</div>
                    </div>
                  </div>
                  <NavbarSearch />
                </div>
                <div className="nav-icons flex justify-between pl-6">
                  <div
                    onClick={() => setLeftModal(true)}
                    className="mobile-burger pr-3 cursor-pointer flex flex-col text-center items-center justify-between"
                  >
                    <HiBars3 size={24} />
                  </div>
                  <Link to="/" className="mobile-logo">
                    <img
                      src="https://gipermart.uz/_next/static/media/logo.b17eab0f.svg"
                      alt=""
                    />
                  </Link>
                  <div
                    onClick={() => navigate("/special-order")}
                    className="cursor-pointer plane px-2 cursor-pointer flex flex-col text-center items-center justify-between"
                  >
                    <SlPlane size={24} />
                    <div className="mobile-hidden-text">Заказы из США</div>
                  </div>
                  <div
                    // onClick={() => navigate("/profile")}
                    onClick={() => isAuth ? navigate("/profile") : setRightModal(true)}
                    className="profile-icon cursor-pointer flex flex-col text-center items-center justify-between"
                  >
                    <CgProfile size={24} />
                    <div className="mobile-hidden-text">Профиль</div>
                  </div>
                  <div
                    onClick={() => navigate("/favorites")}
                    className="favorite-icon cursor-pointer flex flex-col text-center items-center justify-between"
                  >
                    <Badge badgeContent={4} color="primary">
                      <BiHeart size={24} />
                    </Badge>
                    <div className="mobile-hidden-text">Избранное</div>
                  </div>
                  <div
                    onClick={() => navigate("/basket")}
                    className="basket-icon cursor-pointer flex flex-col text-center items-center justify-between"
                  >
                    <Badge badgeContent={4} color="primary">
                      <HiOutlineShoppingCart size={24} />
                    </Badge>
                    <div className="mobile-hidden-text">Корзина</div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </nav>
      </div>
      <MobileNavbar />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth
  }
}

export default connect(mapStateToProps, null)(Navbar);
