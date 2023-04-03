import { Container } from "@mui/system";
import React from "react";
import Title from "../../components/title/Title";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Cart from "../../components/cart/Cart";
import "../../assets/scss/_favorites.scss";
import { useSelector } from "react-redux";

const Favorites = () => {
  const wishListProducts = useSelector((state) => state.wishLists);

  return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <div style={{minHeight: "70vh"}}>
          <Title title="Избранные товары" style="f-bold mb-6 mt-12" />
          {wishListProducts.length > 0 ? (
            <div className="favorites mb-12">
              {wishListProducts.map((item) => (
                <Cart cart={item.product} key={item.id} favorite={true}/>
              ))}
            </div>
            ) : (
              <div className="flex items-center justify-center mt-10">
                <h2 className="text-2xl">Нет избранных товаров</h2>
              </div>
            )}
        </div>
      </Container>
    </>
  );
};

export default Favorites;
