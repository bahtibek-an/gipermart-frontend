import { Button, Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PasswordInput from "../../../../UI/passwordInput/PasswordInput";
import { updateUser } from "./http/userAPI";
import AlertError from "../../../../UI/Alert/AlertError";

const DialogUpdateForm = ({ handleCloseModal, openModal }) => {
    const user = useSelector((state) => state.user?.user);
    const [ firstName, setFirstName ] = useState(user.first_name);
    const [ lastName, setLastName ] = useState(user.last_name);
    const [ email, setEmail ] = useState(user.email);
    const [ number, setNumber ] = useState(user.phone_number);
    const [ password, setPassword ] = useState(user.password);
    const [ confirmPassword, setConfirmPassword ] = useState('');
    const [ error, setError ] = useState('');

    const setErrorMessage = (error) => {
        setError(error);
        setTimeout(() => {
            setError('');
        }, 2000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(confirmPassword !== password) return setErrorMessage("Passwords don't match!");
        await updateUser(user.id, firstName, lastName, email, number, password);
        window.location.reload();
        handleCloseModal();
    }

    const handleChange = (e) => {
        switch (e.target.name) {
            case "email":
                setEmail(e.target.value);
                break;
            case "number":
                setNumber(e.target.value);
                break;
            case "name":
                setFirstName(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "confirm-password":
                setConfirmPassword(e.target.value);
                break;
            case "last_name":
                setLastName(e.target.value);
                break;
            default:
                break;
        }
    }


    return (
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form action="" method="post" onSubmit={handleSubmit}>
            <AlertError
                error={error}
            />
            <div className="!p-8">
                <div>Имя</div>
                <TextField 
                    defaultValue={user.first_name}
                    value={firstName}
                    name="name"
                    onChange={handleChange}
                    className="!w-full !my-4" 
                />
                <div>Фамилия</div>
                <TextField 
                    defaultValue={user.lastName}
                    value={lastName}
                    name="last_name"
                    onChange={handleChange}
                    className="!w-full !my-4" 
                />
                <div>Email</div>
                <TextField 
                    defaultValue={user.email}
                    name="email"
                    type="email"
                    className="!w-full !my-4" 
                    value={email}
                    onChange={handleChange}
                />
                <div>Номер телефона</div>
                <TextField 
                    defaultValue={user.phone_number}
                    type="number"
                    name="number"
                    onChange={handleChange}
                    value={number}
                    className="!w-full !my-4" 
                />
                <div>Пароль</div>
                <PasswordInput
                    error={error !== ''}
                    name="password"
                    onChange={handleChange}
                    value={password}
                />
                <div>Подтвердить Пароль</div>
                <PasswordInput
                    error={error !== ''}
                    name="confirm-password"
                    onChange={handleChange}
                    value={confirmPassword}
                />
                <Button
                    className="yellow-btn-hover !w-full !rounded-none !py-3 !text-base"
                    type="submit"
                    autoFocus
                >
                    Изменить
                </Button>
            </div>
          </form>
        </Dialog>
    );
}

export default DialogUpdateForm;