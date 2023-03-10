import React, { useState } from "react";
import {
    Button,
    TextField,
  } from "@mui/material";
import { getUserById } from "../../../http/UserAPI";
import { useDispatch } from "react-redux";
import { createUser, hideRightModal } from "../../../redux/actions";
import { signIn } from "../api/signInRequest";
import { setTokens } from "../../../helper/UserSignHelper";
import AlertError from "../../../UI/Alert/AlertError";
import LoaderButton from "../../../UI/LoaderButton";
import PasswordInput from "../../../UI/passwordInput/PasswordInput";
import { checkValidityForm } from "../helpers/checkValidityForm";

const LoginForm = ({ setRightModalStep }) => {
    const [ number, setNumber ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const dispatch = useDispatch();

    const appendError = (error) => {
        setTimeout(() => setError(''), 6000);
        return setError(error)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hasError = checkValidityForm(number, password);
        if(hasError) return appendError(hasError);
        setLoading(true);
        try {
            const data = await signIn(number, password);
            if(data.error) {
                setLoading(false);
                return appendError(data.error)
            }
            setTokens(data);
            const user = await getUserById(data.token.id);
            dispatch(createUser(user.data[0]));    
            dispatch(hideRightModal());
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }
    
    return (
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="text-2xl f-medium">
                Войти или создать профиль
            </div>
            <AlertError
                style={{maxWidth: "300px"}}
                error={error}
            />
            <div className="my-4">Номер телефона</div>
            <TextField
                className="!w-full mb-4"
                type="number"
                placeholder="+998 (__) ___ __ __"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
            />
            <div className="my-4">Пароль</div>
            <PasswordInput  
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <LoaderButton
                label="Войти"
                loading={loading}
            />
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

export default LoginForm;