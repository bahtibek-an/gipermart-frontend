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
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useDispatch } from "react-redux";
import { hideRightModal } from "../../../redux/actions";

const AuthSidebar = ({ rightModalStep, setRightModalStep }) => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
                <SignIn setRightModalStep={setRightModalStep}/>
                </>
              )}
              {rightModalStep === "2" && (
                <>
                  <div className="my-4">Номер телефона</div>
                  <TextField
                    className="!w-full !mb-4"
                    type="number"
                    placeholder="+998 (__) ___ __ __"
                  />
                  <Button
                    onClick={() => setRightModalStep("3")}
                    className="!w-full !py-3 yellow-btn-hover !capitalize !text-base !my-3"
                  >
                    Войти
                  </Button>
                </>
              )}
              {rightModalStep === "3" && (
                <>
                  <div className="my-4">Подтверждение пароля</div>
                  <TextField className="!w-full !mb-4" />
                  <Button className="!w-full !py-3 yellow-btn-hover !capitalize !text-base !my-3">
                    Далее
                  </Button>
                </>
              )}
            </div>
    );
}

export default AuthSidebar;