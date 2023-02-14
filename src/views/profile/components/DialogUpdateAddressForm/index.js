import { Button, Dialog, MenuItem, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import Title from "../../../../components/title/Title";
import $host from "../../../../http";
import { countrySource } from "../../../../helper/countryData";
import Select from "../../../../components/select/Select";

const DialogUpdateAddressForm = ({ handleCloseModal2, openModal2 }) => {
  const [ name, setName ] = useState('');
  const [ number, setNumber ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ town, setTown ] = useState('');

  const handleSubmit = async () => {
    const { data } = await $host.post("user/map/");
    return data;
  }

    return (
        <Dialog
          open={openModal2}
          onClose={handleCloseModal2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <form action="" method="post" onSubmit={handleSubmit}>
            <div className="!p-8">
              <Title title="Изменить адрес" style="f-medium mb-4" />
              <div>Имя</div>
              <TextField 
                defaultValue="Ilhom" 
                className="!w-full !my-4" 
                value={name}
                onChange={(e) => setName(e.target.value)}  
              />
              <div>Номер телефона</div>
              <TextField 
                className="!w-full !my-4"
                value={number}
                onChange={(e) => setNumber(e.target.value)} 
              />
              <Stack>
                <div className="mt-4 mb-1">Регион/область*</div>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // onChange={(e) => setRegion(e.target.value)}
                  >
                    {countrySource.country.map((item) => (
                      <MenuItem 
                        key={item.name} 
                        value={item.id} 
                        // onClick={() => setRegion({id: item.id, name: item.name})}
                      >
                          {item.name}
                      </MenuItem>
                    ))}
                  </Select>
              </Stack>
              <div>Адрес</div>
              <TextField 
                className="!w-full !my-4" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}                
              />
              <div>Город</div>
              <TextField 
                defaultValue="UZ" 
                className="!w-full !my-4" 
                value={town}
                // onChange={}
              />
              <Button
                className="yellow-btn-hover !w-full !rounded-none !py-3 !text-base"
                onClick={handleCloseModal2}
                autoFocus
              >
                Обновлять
              </Button>
            </div>
          </form>
        </Dialog>
    );
}

export default DialogUpdateAddressForm;