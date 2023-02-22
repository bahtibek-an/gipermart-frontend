import { Button, Dialog, MenuItem, TextField } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../../../../components/select/Select";
import { countrySource } from "../../../../helper/countryData";
import { updateMapUser } from "../../../../redux/actions";
import AlertError from "../../../../UI/Alert/AlertError";
import { findRegion } from "../../../basket/helper";
import { updateUserMap } from "../DialogUpdateUserForms/http/userAPI";

const DialogUpdateMap = ({ map, openModal, handleCloseModal }) => {
    const user = useSelector((state) => state.user?.user);
    const dispatch = useDispatch();
    const [ title, setTitle ] = useState(map.title);
    const [ phoneNumber, setPhoneNumber ] = useState(map.phone_number);
    const [ address, setAddress ] = useState(map.address);
    const [ region, setRegion ] = useState(findRegion(countrySource, map)?.name || "");
    const regionItem = countrySource.country.find((item) => item.name == region)
    const [ town, setTown ] = useState(map.town); 
    const [ error, setError ] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await updateUserMap({
            mapId: map.id,
            title: title,
            phone_number: phoneNumber,
            address: address,
            town: town,
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
                <div>Имя</div>
                <TextField 
                    value={title}
                    name="name"
                    onChange={(e) => setTitle(e.target.value)}
                    className="!w-full !my-4" 
                />
                <div>Номер телефона</div>
                <TextField 
                    type="number"
                    name="number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={phoneNumber}
                    className="!w-full !my-4" 
                />
                <div>Регион/область*</div>
                <Stack className="mt-4 mb-1">
                  <Select
                    className="border border-neutral-300"
                    error={error !== ''}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={regionItem?.name ?? ''}
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
                        value={town ?? ""}
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