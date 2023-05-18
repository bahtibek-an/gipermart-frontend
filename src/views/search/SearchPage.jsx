import React from "react";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Title from "../../components/title/Title";
import Cart from "../../components/cart/Cart";
import { Container } from "@mui/system";
import "../../assets/scss/_search.scss";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchProductsBySearch } from "../../http/ProductAPI";
import { useSelector } from "react-redux";
import LoadingCart from "../../components/cart/LoadingCart";

const SearchPage = () => {
  const [ searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const fetchProducts = async () => {
    const response = await fetchProductsBySearch(searchQuery);
    setProducts(response);
    setLoading(false);
  }
  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [searchQuery]);
  

  return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <Title
          title={`Результаты поиска по запросу "${searchQuery}"`}
          style="f-medium mt-8 mb-4"
        />
        <div className="search-page mb-12">
          {loading ? (
            [1, 2, 3].map((i) => (
              <LoadingCart key={i}/>
            ))
            ) : (
            products.map((item) => (
              <Cart cart={item} key={item.id}/>
            ))
          )}
        </div>
        {!loading && products.length === 0 && (
          <div 
            className="mt-8 mb-20 flex justify-center"
            style={{ height: "30vh" }}  
          >
              <h1 className="text-2xl">Ничего не найдено</h1>
          </div>
        )}
      </Container>
    </>
  );
};

export default SearchPage;
