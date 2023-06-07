import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import {Alert, Button, TextField} from "@mui/material";
import axios from "axios";
import AlertError from "../../UI/Alert/AlertError";
import {useSelector} from "react-redux";

const BasketModal = ({ closeModal, openModal }) => {
  const [step, setStep] = useState(1);
  const carts = useSelector((state) => state.basket.filter((item) => !item.cart_status));
  const [number, setNumber] = useState('+998');
  const [error, setError] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const exchangeRate = useSelector((state) => state.app.exchange);

  const checkNumber = async (e) => {
      e.preventDefault();
      let phone_number = number;
      if (phone_number.includes("+")) {
        phone_number = phone_number.replace("+", "");
      }

      try {
            const response = await axios.post("https://gw.alifnasiya.uz/e-commerce/merchants/new/applications/request-otp/", {
                "phone": phone_number
            }, {
                headers: {
                    'Merchant-Token': "puoo12qn7phoaedud9iuoed4fe31qkhhxrsx0pxjrrd"
                }
            });
            setStep(3);
      } catch (e) {
          if (e.response.status === 400 && e.response.data.code !== 'limit_exceeded') {
              window.open('https://alifnasiya.uz/auth/registration', '_blank');
          }
          setError(e.response.data.message);
          setTimeout(() => setError(''), 5000);
      }
  }

  const sendConfirmCode = async (e) => {
      e.preventDefault();
      let phone_number = number;
      if (phone_number.includes("+")) {
          phone_number = phone_number.replace("+", "");
      }

      try {
        const products = carts.map((item) => {
            return {
                good: item?.product?.title_ru,
                good_type: item.product?.category_name,
                price: (item?.product?.price * exchangeRate) * 100,
                sku: `${item?.product?.sku}`,
                ikpu: "08471001001000000"
            }
        });

        const response = await axios.post("https://gw.alifnasiya.uz/e-commerce/merchants/new/applications/store", {
            phone: phone_number,
            otp: confirmCode,
            condition: {
                commission: 38,
                duration: 12
            },
            items: products
        }, {
            headers: {
                'Merchant-Token': "puoo12qn7phoaedud9iuoed4fe31qkhhxrsx0pxjrrd"
            }
        });
        setStep(4);
    } catch (e) {
        setError(e.response.data.message);
        setTimeout(() => setError(''), 5000);
    }
  }


  const handleChange = (e) => {
      const value = e.target.value.charAt(e.target.value.length - 1);;
      const regex = /^[0-9\b]+$/;
      if (regex.test(value)) {
          setNumber(e.target.value);
      }
  }

  return (
    <div>
      <Dialog
        open={openModal}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="!p-8">
          {step === 1 && (
            <>
                  <div className="text-center text-2xl">ДОБРО ПОЖАЛОВАТЬ</div>
                  <div className="my-6">
                    Чтобы продолжить оформление рассрочки "Giper-Mart" пожалуеста
                    введите номер телефона с которого регистрировались в сиситеме
                      {" "}<a href="https://alifnasiya.uz/auth/registration" className="link-dark">Alifnasiya</a>. Если вы не регистрировались то пожалуйста регистрируйтесь на сайте!
                  </div>
                  <Button
                    className="yellow-btn-hover !w-full !rounded-none !py-3 !text-base"
                    autoFocus
                    onClick={() => {
                        setStep(2);
                    }}
                  >
                    Далее
                  </Button>
            </>
          )}
          {step === 2 && (
            <>
                <form onSubmit={checkNumber}>
                  <div style={{maxWidth: "100%", width: "400px"}} className="text-2xl f-medium mb-2">Купить в рассрочку</div>
                    {error && <AlertError error={error} />}
                  <div>Мобилный номер</div>
                  <TextField
                      value={number}
                      onChange={handleChange}
                      type="text"
                      className="!rounded-none w-full !my-2"
                      id="outlined-required"
                      placeholder="+998 __ ___ __ __"
                  />
                  <Button
                      type="submit"
                      className="yellow-btn-hover !py-3 !w-full !rounded-none"
                  >
                    Далее
                  </Button>
                </form>
            </>
          )}
            {step === 3 && (
                <>
                    <form onSubmit={sendConfirmCode}>
                        <div style={{maxWidth: "100%", width: "400px"}} className="text-2xl f-medium mb-2">Купить в рассрочку</div>
                        {error && <AlertError error={error} />}
                        <div style={{color: "rgba(0, 0, 0, 0.38)"}}>Мобилный номер</div>
                        <TextField
                            value={number}
                            className="!rounded-none w-full !my-2"
                            id="outlined-required"
                            placeholder="+998 __ ___ __ __"
                            disabled={true}
                        />
                        <div>Код подтверждения</div>
                        <TextField
                            value={confirmCode}
                            onChange={(e) => {
                                if (e.target.value.length > 4) return;
                                setConfirmCode(e.target.value);
                            }}
                            className="!rounded-none w-full !mt-2"
                            id="outlined-required"
                            placeholder="____"
                        />
                        <div className="flex justify-end my-2">
                            <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="text-blue-600"
                            >Изменить номер телофона</button>
                        </div>
                        <Button
                            type="submit"
                            className="yellow-btn-hover !py-3 !w-full !rounded-none"
                        >
                            Далее
                        </Button>
                    </form>
                </>
            )}
            {step === 4 && (
                <div style={{maxWidth: "100%", width: "400px"}}>
                    <Alert className="mb-4" severity="success">Заявка принято. Для подтверждения пожалуйста посмотрите ваш личный кабинет
                        &nbsp;<a className="underline" href="https://alifnasiya.uz/app/applications">Alif Nasiya</a>
                    </Alert>
                    <Button
                        onClick={closeModal}
                        className="yellow-btn-hover !py-3 !w-full !rounded-none"
                    >
                        Закрыть окно
                    </Button>
                </div>
            )}
        </div>
      </Dialog>
    </div>
  );
};

export default BasketModal;
