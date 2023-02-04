import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { showRightModal } from "../../redux/actions";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuth);

    if (!isAuth) {
      dispatch(showRightModal());
      return <Navigate to="/" replace />;
    }
  
    return children;
};

export default ProtectedRoute;