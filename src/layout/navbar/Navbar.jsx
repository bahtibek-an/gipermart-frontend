import React, { useState } from "react";
import { Container } from "@mui/system";
import "../../assets/scss/_navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlinePhone, MdPayment } from "react-icons/md";
import { HiBars3, HiOutlineInformationCircle } from "react-icons/hi2";
import { SlPlane } from "react-icons/sl";
import { CgArrowsExchangeAlt, CgFileDocument, CgProfile } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import {
  Badge,
  Drawer,
  IconButton,
} from "@mui/material";
import NavbarCatalog from "../../components/modal/NavbarCatalog";
import { IoMdClose } from "react-icons/io";
import { GrCatalogOption, GrDeliver } from "react-icons/gr";
import { BiMailSend } from "react-icons/bi";
import MobileNavbar from "./MobileNavbar";
import NavbarSearch from "./NavbarSearch";
import AuthSidebar from "./Auth/AuthSidebar";
import { connect, useDispatch, useSelector } from "react-redux";
import { hideRightModal, showRightModal } from "../../redux/actions";
import { AiOutlineShop, AiOutlineUser } from "react-icons/ai";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import { noScrollbarsClassName } from 'react-remove-scroll-bar';

const Navbar = ({ isAuth, basketProductsLength, wishListsLength }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [navbarFixed, setNavbarFixed] = useState(false);
  const [ rightModalStep, setRightModalStep ] = useState("1");
  const rightModal = useSelector(state => state.app.rightModal);
  const dispatch = useDispatch();
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

  const [leftModal, setLeftModal] = useState(false);

  return (
    <>
      <NavbarCatalog 
        openModal={openModal} 
        closeModal={handleCloseModal} 
        closeLeftModal={() => setLeftModal(false)}
      />
      <div>
        <Drawer
          anchor="left"
          open={leftModal}
          onClose={() => {
            setLeftModal(false);
          }}
        >
          <div className={noScrollbarsClassName}>
            <RemoveScrollBar />
            <div className="text-sm flex items-center px-3 py-1">
              <IconButton
                onClick={() => {
                  setLeftModal(false);
                }}
              >
                <IoMdClose size={24} />
              </IconButton>
              {!isAuth && (
                <div
                  className="flex items-center ml-auto"
                  onClick={() => {
                    // dispatch(hideRightModal())
                  }}
                >
                  <div 
                    onClick={(e) => dispatch(showRightModal())}
                    className="underline underline-offset-1"
                  >
                    Войти
                  </div>
                  <div className="px-1">/</div>
                  <div 
                    className="underline underline-offset-1"
                    onClick={(e) => dispatch(showRightModal())}
                  >
                    Зарегистрироваться
                  </div>
              </div>
              )}
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
            {/* <Link
              to="/profile/order"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <BsBagCheck size={24} />
              Мои заказы
            </Link> */}
            <Link
                to="/profile"
                className="flex items-center gap-x-3 px-4 py-3 bg-white"
              >
              <CgProfile size={24} />
              Профиль
            </Link>
            <Link
              to="/basket"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <Badge badgeContent={basketProductsLength} color="primary">
                <HiOutlineShoppingCart size={24} />
              </Badge>
              Корзина
            </Link>
            <Link
              to="/profile/addresses"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <CgFileDocument color="#2E3A59" size={24} />
              Адреса
            </Link>
            <Link
              to="/special-order"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <SlPlane size={24} />
              Заказы из США
            </Link>
            <Link
              to="/information/refund"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <CgArrowsExchangeAlt size={24}/>
              Условия обмена и возврата
            </Link>
            <Link
              to="/information/delivery"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <GrDeliver size={24}/>
              Доставка
            </Link>
            <Link
              to="/information/payment"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <MdPayment size={24}/>
              Оплата
            </Link>
            <Link
              to="/information/clients"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <AiOutlineUser size={24}/>
              Клиентам
            </Link>
            <Link
              to="/information/blog"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <AiOutlineShop size={24}/>
              Блог
            </Link>
            {/* <Link
              to=""
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <CiLocationOn size={24} />
              Город: Ташкент
            </Link> */}
            {/* <Link
              to=""
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <BiMapAlt size={24} />
              Пункты выдачи
            </Link> */}
            <Link
              to=""
              onClick={() => setLeftModal(false)}
              className="border-b flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <HiOutlineInformationCircle size={24}/>
              О компании
            </Link>
            <a
              href="tel:+998900511676"
              onClick={() => setLeftModal(false)}
              className="flex items-center gap-x-3 px-4 py-3 bg-white"
            >
              <BiMailSend size={24} />
              Обратная связь
            </a>
          </div>
        </Drawer>
      </div>
      <div className="drawer-modal">
        <>
          <Drawer
            anchor={"right"}
            open={rightModal}
            onClose={() => {
              dispatch(hideRightModal());
              setRightModalStep("1");
            }}
          >
            <AuthSidebar 
              rightModalStep={rightModalStep} 
              setRightModalStep={setRightModalStep}
            />
          </Drawer>
        </>
      </div>
      <div className="navbar-height">
        <nav className="navbar">
          <div className={`navbar-top ${navbarFixed && "fix"}`}>
            <Container maxWidth="xl">
              <div className="flex justify-end items-center gap-x-6">
                <a href="tel:+998999190008" className="flex items-center gap-x-3">
                  Поддержка
                </a>
                <a href="tel:+998999190008" className="flex items-center gap-x-3">
                  <MdOutlinePhone size={24} />
                  +998 99 919 00 08
                </a>
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
                      src="../logoo.svg"
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
                    onClick={() => isAuth ? navigate("/profile") : dispatch(showRightModal())}
                    className="profile-icon cursor-pointer flex flex-col text-center items-center justify-between"
                  >
                    <CgProfile size={24} />
                    <div className="mobile-hidden-text">Профиль</div>
                  </div>
                  <div
                    onClick={() => navigate("/favorites")}
                    className="favorite-icon cursor-pointer flex flex-col text-center items-center justify-between"
                  >
                    <Badge badgeContent={wishListsLength} color="primary">
                      <BiHeart size={24} />
                    </Badge>
                    <div className="mobile-hidden-text">Избранное</div>
                  </div>
                  <div
                    onClick={() => navigate("/basket")}
                    className="basket-icon cursor-pointer flex flex-col text-center items-center justify-between"
                  >
                    <Badge badgeContent={basketProductsLength} color="primary">
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
    isAuth: state.user.isAuth,
    basketProductsLength: state.basket?.filter(item => !item.cart_status).length,
    wishListsLength: state?.wishLists.length
  }
}

export default connect(mapStateToProps, null)(Navbar);
