import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { showRightModal } from "../../redux/actions";

const ProtectedRoute = ({ user, children }) => {
  const dispatch = useDispatch();

    if (!user) {
      dispatch(showRightModal());
      return <Navigate to="/" replace />;
    }
  
    return children;
};

export default ProtectedRoute;