import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories, fetchAllProducts } from "./http/ProductAPI";
import { checkAuth } from "./http/UserAPI";
import { fetchCategories, fetchProducts, hideLoader } from "./redux/actions";
import Router from "./Router";
import Spinner from "./UI/spinner/Spinner";

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.app.isLoading);
    
  const fetchData = async () => {
    if(localStorage.getItem("accessToken")) {
      await checkAuth()
    }
    const products = await fetchAllProducts();
    const categories = await fetchAllCategories();
    dispatch(fetchProducts(products));
    dispatch(fetchCategories(categories));
    return dispatch(hideLoader());
  }

  useEffect(() => {
    fetchData();
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
