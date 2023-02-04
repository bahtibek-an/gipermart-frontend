import React, { useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
    Button,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
  } from "@mui/material";
import { signUp } from "../../../http/UserAPI";
import { useDispatch } from "react-redux";
import { createUser, hideRightModal } from "../../../redux/actions";
import { setCookie } from "../../../helper";

const SignUp = ({ setRightModalStep, setRightModal }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [ number, setNumber ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const dispatch = useDispatch();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) return;
        signUp(
            number,
            firstName,
            lastName,
            password,
            confirmPassword
        ).then((data) => {
            localStorage.setItem("accessToken", data.token.access);
            dispatch(createUser(data.token.id));
            setCookie("refreshToken", data.token.refresh, 7);
            dispatch(hideRightModal())
        });
    }

    return (
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="text-2xl f-medium">
                Войти или создать профиль
            </div>
            <div className="my-4">Номер телефона</div>
            <TextField
                className="!w-full mb-4"
                type="number"
                placeholder="+998 (__) ___ __ __"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <div className="my-4">Имя</div>
            <TextField 
                className="!w-full mb-4" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}    
            />
            <div className="my-4">Фамилия</div>
            <TextField 
                className="!w-full mb-4" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}    
            />
            <div className="my-4">Пароль</div>
            <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            className="!w-full mb-4"
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? (
                        <AiFillEye />
                        ) : (
                        <AiFillEyeInvisible />
                        )}
                    </IconButton>
                </InputAdornment>
            }
            />
            <div className="my-4">Подтвердить Пароль</div>
            <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            className="!w-full mb-4"
            placeholder="******"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? (
                        <AiFillEye />
                        ) : (
                        <AiFillEyeInvisible />
                        )}
                    </IconButton>
                </InputAdornment>
            }
            />
            <div className="flex items-center justify-end">
                <Button
                    className="!capitalize !w-max !ml-auto !text-base"
                    size="large"
                    color="inherit"
                    onClick={() => setRightModalStep("2")}
                >
                    Забыли Пароль ?
                </Button>
            </div>
            <Button className="!w-full !py-3 yellow-btn-hover !capitalize !text-base !my-3" type="submit">
                Зарегистрироваться
            </Button>
            <Button
                variant="outlined"
                className="!w-full !py-3 !capitalize !text-base !my-3"
                onClick={() => setRightModalStep("1")}
            >
                Логин
            </Button>
        </form>
    );
}

export default SignUp;