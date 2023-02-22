import { Button, Dialog, MenuItem, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import Select from "../../../../components/select/Select";
import Title from "../../../../components/title/Title";
import { countrySource } from "../../../../helper/countryData";
import AlertError from "../../../../UI/Alert/AlertError";
import $host from "../../../../http";
import { useDispatch, useSelector } from "react-redux";
import { createMapUser } from "../../../../redux/actions";

const DialogCreateAddressForm = ({ openModal, handleCloseModal }) => {
    const user = useSelector((state) => state.user?.user);
    const dispatch = useDispatch();
    const [ name, setName ] = useState('');
    const [ number, setNumber ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ region, setRegion ] = useState("");
    const regionItem = countrySource.country.find((item) => item.name == region)
    const [ town, setTown ] = useState(''); 
    const [ error, setError ] = useState('');

    const setErrorMessage = (message) => {
        setError(message);
        setTimeout(() => setError(''), 4000);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name.trim() || !number.trim() || !town.trim() || !address.trim()) {
            return setErrorMessage("Все поля должны быть заполнены!");
        }
        const { data } = await $host.post("user/map/", {
            title: name,
            phone_number: number,
            address: address,
            town: town,
            user: user.id
        });
        dispatch(createMapUser(data));
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
            <div>Имя</div>
            <TextField 
                className="!w-full !my-4" 
                value={name}
                error={error !== ''}
                onChange={(e) => setName(e.target.value)}
            />
            <div>Номер телефона</div>
            <TextField 
                className="!w-full !my-4" 
                value={number}
                type="number"
                error={error !== ''}
                onChange={(e) => setNumber(e.target.value)}    
            />
            <div>Регион/область*</div>
            <Stack className="mt-4 mb-1">
                  <Select
                    className="border border-neutral-300"
                    error={error !== ''}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={regionItem?.name || ""}
                    onChange={(e) => setRegion(e.target.value)}
                  >
                    {countrySource.country.map((item) => (
                      <MenuItem 
                        key={item.id} 
                        value={item.name} 
                      >
                          {item.name}
                      </MenuItem>
                    ))}
                  </Select>
            </Stack>
            <div >Город/район*</div>
            <Stack className="mt-4 mb-1">
                <Select
                  className="border border-neutral-300"
                  error={error !== ''}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                >
                  {countrySource[regionItem?.id] && countrySource[regionItem?.id].map((i) => (
                    <MenuItem key={i.name} value={i.name}>{i.name}</MenuItem>
                  ))}
                </Select>
            </Stack>
            <div>Адрес</div>
            <TextField 
                className="!w-full !my-4" 
                value={address}
                error={error !== ''}
                onChange={(e) => setAddress(e.target.value)}
            />
            <Button
                className="yellow-btn-hover !w-full !rounded-none !py-3 !text-base"
                autoFocus
                type="submit"
            >
                Добавлять
            </Button>
            </div>
        </form>
    </Dialog>        
    );
}

export default DialogCreateAddressForm;
