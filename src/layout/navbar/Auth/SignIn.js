import React, { useState } from "react";
import {
    Button,
    IconButton,
    InputAdornment,
    OutlinedInput,
    TextField,
  } from "@mui/material";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { signIn } from "../../../http/UserAPI";
import { useDispatch } from "react-redux";
import { createUser } from "../../../redux/actions";
import { setCookie } from "../../../helper";

const SignIn = ({ setRightModalStep, setRightModal }) => {
    const [ showPassword, setShowPassword ] = useState();
    const [ number, setNumber ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await signIn(number, password);
            if(data.error) return setError(data.error);
            localStorage.setItem("accessToken", data.token.access);
            dispatch(createUser(data.token.id));
            setCookie("refreshToken", data.token.refresh, 7);
            setRightModal(false);
        } catch (error) {
            setError(error.code);
        }
        
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleClickShowPassword = () => setShowPassword(prev => !prev);
    
    return (
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="text-2xl f-medium">
            Войти или создать профиль
            </div>
            <div className="text-red-500">
                {error}
            </div>
            <div className="my-4">Номер телефона</div>
            <TextField
                className="!w-full mb-4"
                type="number"
                placeholder="+998 (__) ___ __ __"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
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
                Войти
            </Button>
            <Button
            variant="outlined"
            onClick={() => setRightModalStep("0")}
            className="!w-full !py-3 !capitalize !text-base !my-3"
            >
            Зарегистрироваться
            </Button>
        </form>
    );
}

export default SignIn;