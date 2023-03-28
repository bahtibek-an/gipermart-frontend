import React, {useEffect, useState} from "react";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import "../../assets/scss/_basket.scss";
import { Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Dialog, Stack } from "@mui/material";
import Title from "../../components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../http/CheckoutAPI";
import { connect } from "react-redux";
import { createCheckoutInUser, deleteBasketInLocal, updateDefaultMapUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import { countrySource } from "../../helper/countryData";
import BasketProduct from "./components/BasketProduct";
import styled from "styled-components";
import { findRegion } from "./helper";
import Select from "../../components/select/Select";
import { numberWithCommas } from "../../helper";
import CheckoutModal from "./components/CheckoutModal";

const Checkout = ({ user, defaultUserMapId }) => {
  const [selectedValue, setSelectedValue] = React.useState("a");
  const exchangeRate = useSelector((state) => state.app.exchange);
  const dispatch = useDispatch();
  const defaultUserMap = user.map.find((item) => item.id == defaultUserMapId);
  const [disabledButton, setDisabledButton] = useState(false);
  const { baskets: basketProducts } = useSelector((state) => state);
  const [ fullName, setFullName ] = useState(defaultUserMap?.title);
  const [ phone, setPhone ] = useState(defaultUserMap?.phone_number);
  const [ region, setRegion ] = useState(findRegion(countrySource, defaultUserMap)?.name || "");
  const regionItem = countrySource.country.find((item) => item.name == region)
  const [ town, setTown ] = useState(defaultUserMap?.town);
  const [ address, setAddress ] = useState(defaultUserMap?.address);
  const [ comment, setComment ] = useState('');
  const [ error, setError ] = useState('');
  const [ showModal, setShowModal ] = useState(false);
  const [ modalSuccessData, setModalSuccessData ] = useState({});

  const onButtonClick = async () => {
    const cashStatus = selectedValue === "a";
    const payStatus = selectedValue === "b";
    try {
      const { data } = await createCheckout(
        fullName,
        phone,
        region,
        town,
        address,
        comment,
        basketProducts.map((item) => item.id),
        payStatus,
        cashStatus,
        user.id
      );
      if(payStatus) {
        window.open(data.generate_link, '_blank').focus();
      }
      dispatch(createCheckoutInUser(data));
      basketProducts.forEach(item => dispatch(deleteBasketInLocal(item.product.id)));
      setModalSuccessData(data);
      setShowModal(true);
    } catch(e) {
      setError(e);
    }
  }

  // useEffect(() => {
  //   return ()   => {
  //     // console.log("hello")
  //     // if(showModal)
  //     //   basketProducts.forEach(item => store.dispatch(deleteBasketInLocal(item.product)));
  //   }
  // }, [])

  const totalPrice = basketProducts.reduce((acc, item) => (+item.total * item.quantity) + acc, 0);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const [openModal2, setOpenModal2] = useState(false);
  const handleCloseModal2 = () => {
    setOpenModal2(false);
  };
  const handleClickOpenModal2 = () => {
    setOpenModal2(true);
  };

  const updateMapUser = (mapId) => {
    dispatch(updateDefaultMapUser(mapId));
    const defaultUserMap = user.map.find((item) => item.id == mapId);
    setFullName(defaultUserMap?.title);
    setPhone(defaultUserMap?.phone_number);
    setRegion(findRegion(countrySource, defaultUserMap)?.name || "");
    setTown(defaultUserMap?.town);
    setAddress(defaultUserMap?.address);
  }
  

  const DetailItem = styled.div`
    @media(max-width: 640px) {
      
    }
  `

  const DetailButtons = styled.div`
    @media(max-width: 640px) {
      margin: 0;
      margin-top: 2rem;
      width: 100%;
    }
    .buttons {
      @media(max-width: 640px) {
        display: flex;
        justify-content: center;
      }
    }
    .underline {
      @media(max-width: 640px) {
        margin: 0;
        margin-left: 1rem;
        display: flex;
        align-items: center;
      }
    }
  `

  return (
    <>
      <SecondNavbar />
        <CheckoutModal 
          showModal={showModal}
          data={modalSuccessData}
        />
      <div>
        <Dialog
          open={openModal2}
          onClose={handleCloseModal2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="!p-8">
            <Title title="Выбрать другой адрес" style="f-medium mb-4"/>
            {user.map.map((item) => (
            <DetailItem
              className="flex justify-between border-4 border p-5 mb-4 flex-wrap"
              key={item.id}
            >
              <div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Имя</div>
                  <div>{ item.title }</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Tелефон</div>
                  <div>{ item.phone_number }</div>
                </div>
                <div className="flex items-baseline gap-4 leading-none">
                  <div className="f-bold text-xl">Адрес</div>
                  <div>{ item.town } { item.address }</div>
                </div>
              </div>
              <DetailButtons className="flex items-center ml-16">
                <div className="buttons">
                  <div className="flex items-center">
                    <Button
                      disabled={item.id == defaultUserMap?.id}
                      onClick={() => item.id != defaultUserMap?.id && updateMapUser(item.id)}
                      className={`yellow-btn-hover !rounded-none !text-base !w-full`}
                    >
                      {item.id == defaultUserMap?.id ? "Выбрано" : "Выбрать"}
                    </Button>
                  </div>
                  <Link to="/profile/addresses">
                    <div className="underline cursor-pointer mt-2">
                      Редактировать
                    </div>
                  </Link>
                </div>
              </DetailButtons>
            </DetailItem>
            ))}
            <Link to="/profile/addresses">
              <Button
                className="yellow-btn-hover !w-full !rounded-none !py-3 !text-base"
                onClick={handleCloseModal2}
                autoFocus
              >
                Добавить новый адрес
              </Button>
            </Link> 
          </div>
        </Dialog>
      </div>
      <Container maxWidth="xl">
        <div className="checkout-section grid lg:grid-cols-2 grid-cols-1 mt-6">
          <div className="left lg:pr-4 lg:border-r border-black">
            <div className="md:text-4xl text-2xl f-bold my-6">Оформление заказа</div>
            {!defaultUserMap ? (
              <div className="mb-4">
                <div>
                  <Button 
                    className="yellow-btn-hover !w-full !rounded-none !py-3 !text-base"
                    onClick={handleClickOpenModal2}  
                  >
                    Выбрать адрес по умолчанию
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-4 border p-5 mb-4">
                <div className="flex justify-end">
                  <h2 
                    className="underline cursor-pointer"
                    onClick={handleClickOpenModal2}  
                  >
                    Выбрать другой адрес
                  </h2>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Имя</div>
                  <div>{ defaultUserMap.title }</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Tелефон</div>
                  <div>{ defaultUserMap.phone_number }</div>
                </div>
                <div className="flex items-baseline gap-4 mb-2 leading-none">
                  <div className="f-bold text-xl">Адрес</div>
                  <div>{ defaultUserMap.town } { defaultUserMap.address }</div>
                </div>
              </div>
            )}
            
            <div className="text-2xl f-medium mt-2">Контактные данные</div>
            <div className="mt-4">Контактное лицо (ФИО)</div>
            <TextField
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              className="!rounded-none w-full !my-4"
              id="outlined-required"
            />
            <div className="mt-4">Контактный телефон</div>
            <TextField
              type="number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="!rounded-none w-full !my-4"
              id="outlined-required"
            />
            <div className="text-2xl f-medium">Доставка</div>
            <div className="mt-4">Адрес</div>
            <Stack>
              <div className="mt-4 mb-1">Регион/область*</div>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="border border-neutral-300"
                  value={regionItem?.name ?? ''}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  {countrySource.country.map((item) => (
                    <MenuItem
                      key={item.id} 
                      value={item.name} 
                    >
                        {item.name}
                    </MenuItem>
                  ))}
                </Select>
            </Stack>

            <Stack>
              <div className="mt-4 mb-1">Город/район*</div>
                <Select
                  className="border border-neutral-300"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={town ?? ''}
                  onChange={(e) => setTown(e.target.value)}
                >
                  {countrySource[regionItem?.id] && countrySource[regionItem?.id].map((i) => (
                    <MenuItem key={i.name} value={i.name}>{i.name}</MenuItem>
                  ))}
                </Select>
            </Stack>

            <div className="mt-4 mb-1">Адрес*</div>
            <TextField
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="!rounded-none w-full"
              id="outlined-required"
            />
            <div className="mt-4 mb-1">Комментарии к заказу</div>
            <TextField
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              id="outlined-multiline-flexible"
              className="w-full"
              multiline
              minRows={4}
              maxRows={4}
            />
            <div className="grid md:grid-cols-2 gap-4 my-4">
              <label className="payment-box">
                <Radio
                  color="warning"
                  checked={selectedValue === "a"}
                  onChange={handleChange}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "A" }}
                />
                <div className="p-6">
                  <div className="text-xl leading-none">Наличными курьеру</div>
                  <div className="text-sm" style={{ color: "#999" }}>
                    Наличными курьеру
                  </div>
                </div>
              </label>
              <label className="payment-box">
                <Radio
                  color="warning"
                  checked={selectedValue === "b"}
                  onChange={handleChange}
                  value="b"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "B" }}
                />
                <img
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "contain",
                  }}
                  src="https://logobank.uz:8005/media/logos_png/payme-01.png"
                  alt=""
                />
              </label>
            </div>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => setDisabledButton(e.target.checked)}
                />
              }
              label="Подтвердить"
            />
            <Button
              disabled={!disabledButton}
              onClick={onButtonClick}
              className={`yellow-btn-hover !rounded-none !py-3 !text-base !my-4 !w-full`}
            >
              Подтвердить заказ
            </Button>
          </div>
          <div className="right lg:pl-4 mb-8">
            {
              basketProducts.map((basket) => (
                <BasketProduct basket={basket} key={basket.id}/>
              ))
            }
            <div className="border-t border-b py-6 my-6">
              <div className="flex items-center justify-between">
                <div>Сумма по товарам</div>
                <div className="text-xl f-bold">{numberWithCommas(totalPrice * exchangeRate)} Сум</div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>Стоимость доставки</div>
                <div className="text-xl f-bold">0</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-xl">Итого:</div>
              <div className="text-xl f-bold">{numberWithCommas(totalPrice * exchangeRate)} Сум</div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    defaultUserMapId: state.user.defaultMap
  }
}

export default connect(mapStateToProps, null)(Checkout);
