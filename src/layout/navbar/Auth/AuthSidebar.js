import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
    Button,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
  } from "@mui/material";
import SignUp from "./SignUp";
import { useDispatch } from "react-redux";
import { hideRightModal } from "../../../redux/actions";
import LoginForm from "../../../modules/LoginForm";
import PhoneNumberInput from "../../../components/phoneNumberInput/phoneNumberInput";
import $host from "../../../http";
import PasswordInput from "../../../UI/passwordInput/PasswordInput";
import AlertError from "../../../UI/Alert/AlertError";

const AuthSidebar = ({ rightModalStep, setRightModalStep }) => {
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ otpCode, setOtpCode ] = useState('');
    const [ newPassword, setNewPassword ] = useState('');
    const [ showPassword, setShowPassword ] = useState(false);
    const [ error, setError ] = useState('');
    const dispatch = useDispatch();

    const appendError = (error) => {
      setTimeout(() => setError(''), 6000);
      return setError(error)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const sendPhoneNumber = async () => {
      try {
        const response = await $host.post('user/resend/', { phone_number: phoneNumber.replace('+', '') });
        setRightModalStep("3");
      } catch (error) {
        appendError(error.response?.data?.phone_number?.[0])
      } 
    }

    const sendOtpCode = async () => {
      try {
        const response = await $host.post('user/confirmation/', { 
          phone_number: phoneNumber.replace('+', ''),
          verification_code: otpCode,
          password: newPassword,
        });
        setRightModalStep("1");
      } catch (error) {
        appendError(error.response?.data?.phone_number?.[0])
      }
      
      
    }

    return (
        <div className="p-8 pt-2">
              <div className="flex items-center justify-end">
                <IconButton
                  onClick={() => {
                    dispatch(hideRightModal())
                    setRightModalStep("1");
                  }}
                  className="!ml-auto"
                >
                  <IoMdClose size={24} />
                </IconButton>
              </div>
              {rightModalStep === "0" && (
                <>
                  <SignUp setRightModalStep={setRightModalStep}/>
                </>
              )}
              {rightModalStep === "1" && (
                <>
                  {/* <SignIn setRightModalStep={setRightModalStep}/> */}
                  <LoginForm setRightModalStep={setRightModalStep}/>
                </>
              )}
              {rightModalStep === "2" && (
                <>
                  <AlertError
                    style={{maxWidth: "300px"}}
                    error={error}
                  />
                  <div className="my-4">Номер телефона</div>
                  <PhoneNumberInput
                    inputStyle={{
                      minWidth: '290px',
                      height: "56px",
                      fontSize: "16px",
                      fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                      borderRadius: "4px"
                    }}
                    value={phoneNumber}
                    onChange={(val) => setPhoneNumber(val)}
                    className="!w-full !mb-4"
                    type="number"
                    placeholder="+998 (__) ___ __ __"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        sendPhoneNumber()
                      }
                    }}
                  />
                  <Button
                    onClick={sendPhoneNumber}
                    className="!w-full !py-3 yellow-btn-hover !capitalize !text-base !my-3"
                  >
                    Отправить смс
                  </Button>
                </>
              )}
              {rightModalStep === "3" && (
                <>
                  <div className="my-4">Код отправленный вам на номер</div>
                  <TextField 
                    className="!w-full !mb-4"
                    value={otpCode}
                    type="number"
                    onChange={(e) => setOtpCode(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        sendOtpCode()
                      }
                    }}
                  />

                  <div className="my-4">Новый пароль</div>
                  <PasswordInput 
                    className="!w-full !mb-4"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        sendOtpCode()
                      }
                    }}
                  />

                  <Button 
                    className="!w-full !py-3 yellow-btn-hover !capitalize !text-base !my-3"
                    onClick={sendOtpCode}  
                  >
                    Отправить
                  </Button>
                </>
              )}
            </div>
    );
}

export default AuthSidebar;