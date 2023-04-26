import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const BasketModal = ({ closeModal, openModal }) => {
  const [step, setStep] = useState(1);
  const [number, setNumber] = useState('');

  const checkNumber = async () => {
      const response = await axios.get("https://gw.alifnasiya.uz/e-commerce/merchants/new/applications/request-otp/", {
          "phone": numb
      }, {
          headers: {
              'Merchant-Token': "puoo12qn7phoaedud9iuoed4fe31qkhhxrsx0pxjrrd"
          }
      });
      console.log(response);
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
                onClick={() => {
                  setStep(2);
                }}
                autoFocus
              >
                Далее
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="text-2xl f-medium mb-2">Купить в рассрочку</div>
              <div>Мобилный номер</div>
              <TextField
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="!rounded-none w-full !my-4"
                  id="outlined-required"
                  placeholder="+998 __ ___ __ __"
              />
              <Button
                  onClick={checkNumber}
                  className="yellow-btn-hover !py-3 !w-full !rounded-none"
              >
                Далее
              </Button>
            </>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default BasketModal;
