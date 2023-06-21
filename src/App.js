import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, fetchExchangeRates } from "./http/ProductAPI";
import { checkAuth } from "./http/UserAPI";
import { createExchangeRates, fetchCategories, hideLoader } from "./redux/actions";
import Router from "./Router";
import Spinner from "./UI/spinner/Spinner";

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.app.isLoading);

  const fetchData = async () => {
    if(localStorage.getItem("accessToken")) {
      await checkAuth()
    }
    const exchange = await fetchExchangeRates();
    const categories = await fetchAllCategories();
    dispatch(createExchangeRates(exchange));
    dispatch(fetchCategories(categories));
    return dispatch(hideLoader());
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    loading ? 
    <div className="flex items-center justify-center h-screen">
      <Spinner />
    </div>
    :
    <Router />
  );
};

export default App;
