import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, getUserById } from "./http/UserAPI";
import { fetchProducts } from "./redux/actions";
import Router from "./Router";
import Spinner from "./UI/spinner/Spinner";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.app.isLoading);

  useEffect(() => {
    dispatch(fetchProducts());
    if(localStorage.getItem("accessToken")) {
      checkAuth();
    }
  }, []);

  if(isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner/>
      </div>
    );
  }

  return (
    <Router/>
  );
};

export default App;
