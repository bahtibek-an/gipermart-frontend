import { Button, Dialog, MenuItem, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import Select from 'react-select';
import Title from "../../../../components/title/Title";
import { countrySource } from "../../../../helper/countryData";
import AlertError from "../../../../UI/Alert/AlertError";
import $host from "../../../../http";
import { useDispatch, useSelector } from "react-redux";
import { createMapUser } from "../../../../redux/actions";
import { towns } from "../../../../helper/countryData";

const DialogCreateAddressForm = ({ openModal, handleCloseModal }) => {
    const user = useSelector((state) => state.user?.user);
    const dispatch = useDispatch();
    const [ address, setAddress ] = useState('');
    const [ region, setRegion ] = useState({});
    const [ town, setTown ] = useState({});
    const [ error, setError ] = useState('');
    const [loading, setLoading] = useState(false);

    const setErrorMessage = (message) => {
        setError(message);
        setTimeout(() => setError(''), 4000);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!town.value?.trim() || !address.trim() || !region.value?.trim()) {
            return setErrorMessage("Все поля должны быть заполнены!");
        }
        setLoading(true);
        const { data } = await $host.post("user/map/", {
            address: address,
            region: region.value,
            town: town.value,
            user: user.id
        });
        dispatch(createMapUser(data));
        setLoading(false);
        handleCloseModal();
    }

    return (
    <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <AlertError
            error={error}
        />
        <form action="" method="post" onSubmit={handleSubmit}>
            <div className="!p-8">
            <Title title="Создать адрес" style="f-medium mb-4" />
            <Stack className="mt-4 mb-1">
                <div>Регион/область*</div>
                <Select
                    onChange={(selectedOption) => setRegion(selectedOption)}
                    placeholder="Регион/область"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            height: '55px',
                        }),
                        menu: (provided, state) => ({
                            ...provided,
                        }),
                    }}
                    options={countrySource}
                />
            </Stack>
            <Stack className="mt-4 mb-1">
                <div>Город/район*</div>
                <Select
                    onChange={(selectedOption) => setTown(selectedOption)}
                    placeholder="Город/район*"
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            height: '55px',
                        }),
                        menu: (provided, state) => ({
                            ...provided,
                        }),
                    }}
                    options={!region.id ? [] : towns[region.id]}
                />
            </Stack>
            <div>Адрес</div>
            <TextField 
                className="!w-full !my-4" 
                value={address}
                error={error !== ''}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Button
                disabled={loading}
                className="yellow-btn-hover !w-full !rounded-none !py-3 !text-base"
                autoFocus
                type="submit"
            >
                Добавить
            </Button>
            </div>
        </form>
    </Dialog>        
    );
}

export default DialogCreateAddressForm;
