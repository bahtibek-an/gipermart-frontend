import { Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Title from "../../components/title/Title";
import { CgFileDocument } from "react-icons/cg";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import { Container } from "@mui/system";
import { BiPencil, BiTrash } from "react-icons/bi";
import DialogCreateAddressForm from "./components/DialogCreateAddressForm";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserMapById } from "./components/http";
import { deleteUserMapInState } from "../../redux/actions";
import AddressItem from "./components/AdressItem";

const Addresses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userMap = useSelector((state) => state.user?.user?.map);
  const location = useLocation();
  const pathName = location.pathname;
  const [openModal, setOpenModal] = useState(false);

  const deleteUserMap = async (mapId) => {
    const data = await deleteUserMapById(mapId);
    dispatch(deleteUserMapInState(mapId));
  }

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };


  console.log(userMap)

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
              {userMap.map((item) => (
                <AddressItem 
                  key={item.id}
                  map={item}
                />
              ))}
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
    </>
  );
};

export default Addresses;
