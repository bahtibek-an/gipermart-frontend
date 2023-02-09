import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./http/UserAPI";
import { fetchProducts } from "./redux/actions";
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
      return;
    }
    dispatch(fetchProducts());
  }, []);

  return (
    <>
    {isLoading ? (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    ) : (
      <Router/>
    )}
    </>
  );
};

export default App;
