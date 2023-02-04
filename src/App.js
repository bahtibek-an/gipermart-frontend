import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, getUserById } from "./http/UserAPI";
import { fetchProducts, fetchUserBasket } from "./redux/actions";
import Router from "./Router";
import Spinner from "./UI/spinner/Spinner";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.app.isLoading);
  
  useEffect(() => {
    if(localStorage.getItem("accessToken")) {
      checkAuth()
        .then(() => {
          dispatch(fetchProducts())
        });
        getUserById(11).then((data) => {
          console.log(data);
        })
      return;
    }
    dispatch(fetchProducts());
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
