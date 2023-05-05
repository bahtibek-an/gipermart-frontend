import { IconButton } from "@mui/material";
import React, { useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { deleteUserMapInState } from "../../../../redux/actions";
import DialogUpdateMap from "../DialogUpdateMap";
import { deleteUserMapById } from "../http";

const AddressItem = ({ map }) => {
    const [ openModal, setOpenModal ] = useState(false);
    const dispatch = useDispatch();

    const handleCloseModal = () => setOpenModal(false)
    const handleClickOpenModal = () => setOpenModal(true);

    const deleteUserMap = async (mapId) => {
        dispatch(deleteUserMapInState(mapId));
        await deleteUserMapById(mapId);
    }
    
    return (
        <div className="border-4 border p-5">
            <div className="flex items-center justify-end">
            <IconButton onClick={handleClickOpenModal}>
                <BiPencil color="#999" size={20} />
            </IconButton>
            <IconButton onClick={() => deleteUserMap(map.id)} >
                <BiTrash
                    color="#999" 
                    size={20} 
                />
            </IconButton>
            </div>
            <div className="flex items-baseline gap-4 mb-2 leading-none">
            <div className="f-bold text-xl">Регион/область</div>
            <div>{map.region}</div>
            </div>
            <div className="flex items-baseline gap-4 mb-2 leading-none">
            <div className="f-bold text-xl">Город/район</div>
            <div>{map.town}</div>
            </div>
            <div className="flex items-baseline gap-4 mb-2 leading-none">
            <div className="f-bold text-xl">Адрес</div>
            <div>{map.address}</div>
            </div>
            <DialogUpdateMap
                map={map}
                handleCloseModal={handleCloseModal}
                openModal={openModal}
            />
        </div>
    )
}

export default AddressItem;