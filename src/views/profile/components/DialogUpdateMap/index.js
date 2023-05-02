import { Button, Dialog, MenuItem, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {countrySource, towns} from "../../../../helper/countryData";
import { updateMapUser } from "../../../../redux/actions";
import AlertError from "../../../../UI/Alert/AlertError";
import { updateUserMap } from "../DialogUpdateUserForms/http/userAPI";
import Select from 'react-select';

function findTown(map) {
    const keys = Object.keys(towns);
    for(let i = 0;i < keys.length;i++) {
        const item = towns[keys[i]];
        for(let j = 0;j < item.length;j++) {
            if(item[j].value === map.town) {
                return item[j];
            }
        }
    }
    return {};
}
const DialogUpdateMap = ({ map, openModal, handleCloseModal }) => {

    const user = useSelector((state) => state.user?.user);
    const dispatch = useDispatch();
    const [ address, setAddress ] = useState();
    const [ region, setRegion ] = useState(countrySource.find((item) => item.value === map.region));
    const [ town, setTown ] = useState(findTown(map));
    const [ error, setError ] = useState('');




    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await updateUserMap({
            mapId: map.id,
            address: address,
            town: town.value,
            user: user.id
        });
        dispatch(updateMapUser(data));
        handleCloseModal();
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
                <Stack className="mt-4 mb-1">
                    <div>Регион/область*</div>
                    <Select
                        onChange={(selectedOption) => setRegion(selectedOption)}
                        placeholder="Регион/область"
                        value={region}
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
                        value={town}
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

export default DialogUpdateMap;