import { Button, Dialog, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Title from "../../components/title/Title";
import { CgFileDocument } from "react-icons/cg";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import { Container } from "@mui/system";
import { BiPencil, BiTrash } from "react-icons/bi";
import DialogCreateAddressForm from "./components/DialogCreateAddressForm";

const Adresses = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathName = location.pathname;
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickOpenModal2 = () => {
    setOpenModal2(true);
  };

  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };

  return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <div className="pages">
          <Link to="/">Магазин /</Link>
          <Link to="/profile">Личный кабинет /</Link>
          <div>Адрес</div>
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
                onClick={() => navigate("/profile/adresses")}
                className={`item ${
                  pathName === "/profile/adresses" && "active"
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
            <div className="flex items-center justify-between">
              <Title title="Адрес" style="f-medium" />
              <Button
                onClick={handleClickOpenModal}
                className="yellow-btn-hover !capitalize !py-3 !text-base !rounded-none"
              >
                Создать адрес
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 my-8">
              <div className="border-4 border p-5">
                <div className="flex items-center justify-end">
                  <IconButton onClick={handleClickOpenModal2}>
                    <BiPencil color="#999" size={20} />
                  </IconButton>
                  <IconButton>
                    <BiTrash color="#999" size={20} />
                  </IconButton>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Имя</div>
                  <div>ILKHOM</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Tелефон</div>
                  <div>+998994064667</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Адрес</div>
                  <div>Chilonzor 20kv Diydor 10</div>
                </div>
              </div>
              <div className="border-4 border p-5">
                <div className="flex items-center justify-end">
                  <IconButton onClick={handleClickOpenModal2}>
                    <BiPencil color="#999" size={20} />
                  </IconButton>
                  <IconButton>
                    <BiTrash color="#999" size={20} />
                  </IconButton>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Имя</div>
                  <div>ILKHOM</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Tелефон</div>
                  <div>+998994064667</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Адрес</div>
                  <div>Chilonzor 20kv Diydor 10</div>
                </div>
              </div>
              <div className="border-4 border p-5">
                <div className="flex items-center justify-end">
                  <IconButton onClick={handleClickOpenModal2}>
                    <BiPencil color="#999" size={20} />
                  </IconButton>
                  <IconButton>
                    <BiTrash color="#999" size={20} />
                  </IconButton>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Имя</div>
                  <div>ILKHOM</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Tелефон</div>
                  <div>+998994064667</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Адрес</div>
                  <div>Chilonzor 20kv Diydor 10</div>
                </div>
              </div>
              <div className="border-4 border p-5">
                <div className="flex items-center justify-end">
                  <IconButton onClick={handleClickOpenModal2}>
                    <BiPencil color="#999" size={20} />
                  </IconButton>
                  <IconButton>
                    <BiTrash color="#999" size={20} />
                  </IconButton>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Имя</div>
                  <div>ILKHOM</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Tелефон</div>
                  <div>+998994064667</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Адрес</div>
                  <div>Chilonzor 20kv Diydor 10</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div>
        <DialogCreateAddressForm
          openModal={openModal}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <div>
        <DialogCreateAddressForm
          handleCloseModal2={handleCloseModal2}
          openModal2={openModal2}
        />
      </div>
    </>
  );
};

export default Adresses;
