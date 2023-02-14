import { Button, Dialog, MenuItem, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import Select from "../../../../components/select/Select";
import Title from "../../../../components/title/Title";
import { countrySource } from "../../../../helper/countryData";
import AlertError from "../../../../UI/Alert/AlertError";
import $host from "../../../../http";
import { useSelector } from "react-redux";

const DialogCreateAddressForm = ({ openModal, handleCloseModal }) => {
    const user = useSelector((state) => state.user?.user);
    const [ name, setName ] = useState('');
    const [ number, setNumber ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ region, setRegion ] = useState({});
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
                    error={error !== ''}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={region.name}
                  >
                    {countrySource.country.map((item) => (
                      <MenuItem 
                        key={item.name} 
                        value={item.id} 
                        onClick={() => setRegion({id: item.id, name: item.name})}
                      >
                          {item.name}
                      </MenuItem>
                    ))}
                  </Select>
            </Stack>
            <div >Город/район*</div>
            <Stack className="mt-4 mb-1">
                <Select
                  error={error !== ''}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                >
                  {countrySource[region.id] && countrySource[region.id].map((i) => (
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
