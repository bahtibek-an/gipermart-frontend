import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { showRightModal } from "../../redux/actions";

const PrivateRoutes = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();
   
    if(!isAuth) {
        setTimeout(() => dispatch(showRightModal()),200)
        return <Navigate to="/" />;
    }

    return <Outlet/>
}

export default PrivateRoutes;