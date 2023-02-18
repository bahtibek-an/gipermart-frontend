import React, { useState } from "react";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import "../../assets/scss/_basket.scss";
import { Container } from "@mui/system";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button, Dialog, IconButton, Modal, Paper, Stack, Typography } from "@mui/material";
import { BiPencil, BiTrash } from "react-icons/bi";
import Title from "../../components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../http/CheckoutAPI";
import { connect } from "react-redux";
import { createCheckoutInUser, deleteBasketInLocal } from "../../redux/actions";
import { Link } from "react-router-dom";
import { countrySource } from "../../helper/countryData";
import BasketProduct from "./components/BasketProduct";

const Checkout = ({ user }) => {
  const [selectedValue, setSelectedValue] = React.useState("a");
  const dispatch = useDispatch();
  const [disabledButton, setDisabledButton] = useState(false);
  const { baskets: basketProducts } = useSelector((state) => state);
  const [ fullName, setFullName ] = useState(`${user.first_name} ${user.last_name}`);
  const [ phone, setPhone ] = useState(`${user.phone_number}`);
  const [ region, setRegion ] = useState({});
  const [ town, setTown ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ comment, setComment ] = useState('');
  const [ error, setError ] = useState('');
  const [ showModal, setShowModal ] = useState(false);

  const onButtonClick = async () => {
    const cashStatus = selectedValue === "a";
    console.log(region)
    try {
      const { data } = await createCheckout(
        fullName,
        phone,
        region.name,
        town,
        address,
        comment,
        basketProducts.map((item) => item.id),
        true,
        cashStatus,
        user.id
      );
      basketProducts.forEach(item => dispatch(deleteBasketInLocal(item.product.id)));
      dispatch(createCheckoutInUser(data));
      setShowModal(true);
    } catch(e) {
      setError(e);
    }
  }

  const totalPrice = basketProducts.reduce((acc, item) => +item.total + acc, 0);
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
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
  };

  return (
    <>
      <SecondNavbar />
        <Modal
          open={showModal}
        >
          <Box sx={{ ...style}}>
            <Paper sx={{ borderRadius: 0, padding: '40px' }}>
              <Stack sx={{ gap: '1rem' }}>
                <h2 className="font-medium text-2xl">Заказ №: 245 оформлен</h2>
                <p className="mt-4">Отслеживать статус заказа можно в личном кабинете</p>
                <div className="mt-8 flex">
                  <Button
                    className={`!mr-4 yellow-btn-hover !rounded-none !py-3 !text-base !w-full`}
                  >
                    <Link to="/profile/order">
                      Смотреть заказы
                    </Link>
                  </Button>
                  <Button
                    className={`yellow-btn-hover !rounded-none !py-3 !text-base !w-full`}
                  >
                    <Link to="/">
                      Продолжить покупки
                    </Link>
                  </Button>
                </div>
                {/* <Typography variant="h4">
                  Заказ №:{' '}
                  <Typography component="span" variant="h2" fontWeight={300}>
                    {checkoutCompleteData?.checkoutComplete?.order?.number}
                  </Typography>{' '}
                  оформлен
                </Typography>
                <Typography variant="subtitle2">
                  Отслеживать статус заказа можно в личном кабинете
                </Typography>
                <Stack justifyContent="space-between" direction="row">
                  {paymentGateway !== '1' && (
                    <Button
                      loading={paymeLoading}
                      onClick={handlePayment}
                      variant="contained"
                    >
                      ОПЛАТИТЬ
                    </Button>
                  )}
                  <Button
                    onClick={() => router.push(Paths.HOME)}
                    variant="text"
                    sx={{ color: colors.black }}
                  >
                    ПРОДОЛЖИТЬ ПОКУПКИ
                  </Button>
                </Stack> */}
              </Stack>
            </Paper>
          </Box>
        </Modal>
      <div>
        <Dialog
          open={openModal2}
          onClose={handleCloseModal2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="!p-8">
            <Title title="Изменить адрес" style="f-medium mb-4" />
            <div>Имя</div>
            <TextField defaultValue="Ilhom" className="!w-full !my-4" />
            <div>Номер телефона</div>
            <TextField defaultValue="+998900511676" className="!w-full !my-4" />
            <div>Адрес</div>
            <TextField defaultValue="Diydor 10" className="!w-full !my-4" />
            <div>Город</div>
            <TextField defaultValue="UZ" className="!w-full !my-4" />
            <Button
              className="yellow-btn-hover !w-full !rounded-none !py-3 !text-base"
              onClick={handleCloseModal2}
              autoFocus
            >
              Обновлять
            </Button>
          </div>
        </Dialog>
      </div>
      <Container maxWidth="xl">
        <div className="checkout-section grid lg:grid-cols-2 grid-cols-1 mt-6">
          <div className="left lg:pr-4 lg:border-r border-black">
            <div className="md:text-4xl text-2xl f-bold my-6">Оформление заказа</div>
            <div className="border-4 border p-5 mb-4">
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
                <div>{ user.first_name }</div>
              </div>
              <div className="flex items-baseline gap-4 mb-2 leading-none">
                <div className="f-bold text-xl">Tелефон</div>
                <div>{ user.phone_number }</div>
              </div>
              <div className="flex items-baseline gap-4 mb-2 leading-none">
                <div className="f-bold text-xl">Адрес</div>
                <div>Chilonzor 20kv Diydor 10</div>
              </div>
            </div>
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
              defaultValue="+998 __ ___ __ __"
            />
            <div className="text-2xl f-medium">Доставка</div>
            <div className="mt-4">Адрес</div>
            <Stack>
              <div className="mt-4 mb-1">Регион/область*</div>
              <FormControl fullWidth sx>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // onChange={(e) => setRegion(e.target.value)}
                >
                  {countrySource.country.map((item) => (
                    <MenuItem 
                      key={item.name} 
                      value={item.id} 
                      onClick={() => setRegion({id: item.id, name: item.name})}
                    >
                        {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>

            <Stack>
              <div className="mt-4 mb-1">Город/район*</div>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  onChange={(e) => setTown(e.target.value)}
                >
                  {countrySource[region.id] && countrySource[region.id].map((i) => (
                    <MenuItem key={i.name} value={i.name}>{i.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                <div className="text-xl f-bold">{totalPrice} Сум</div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>Стоимость доставки</div>
                <div className="text-xl f-bold">0</div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4">
              <div className="text-xl">Итого:</div>
              <div className="text-xl f-bold">{totalPrice} Сум</div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps, null)(Checkout);
