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

const SearchPage = () => {
  const [ searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const [ products, setProducts ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const fetchProducts = async () => {
    const response = await fetchProductsBySearch(searchQuery);
    return response.results.map((item) => ({
      id: item.id,
      price: item.price,
      name: item.product.name,
      description: item.product.description
    }));
  }

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, [searchQuery]);
  
  if(loading) return;

  return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <Title
          title={`Результаты поиска по запросу "${searchQuery}"`}
          style="f-medium mt-8 mb-4"
        />
        <div className="search-page mb-12">
          {products.map((item) => (
            <Cart cart={item} key={item.id}/>
          ))}
        </div>
      </Container>
    </>
  );
};

export default SearchPage;
