import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllCategories, fetchExchangeRates } from "./http/ProductAPI";
import { checkAuth } from "./http/UserAPI";
import { createExchangeRates, fetchCategories, hideLoader } from "./redux/actions";
import Router from "./Router";

const App = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    if(localStorage.getItem("accessToken")) {
      await checkAuth()
    }
    const exchange = await fetchExchangeRates();
    const categories = await fetchAllCategories();
    dispatch(createExchangeRates(+exchange.at(-1).nbu_buy_price));
    dispatch(fetchCategories(categories));
    // return dispatch(hideLoader());
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Router />
  );
};

export default App;
