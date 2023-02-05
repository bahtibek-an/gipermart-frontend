import { Container } from "@mui/system";
import React from "react";
import Title from "../../components/title/Title";
import SecondNavbar from "../../layout/navbar/SecondNavbar";
import Cart from "../../components/cart/Cart";
import "../../assets/scss/_favorites.scss";
import { useSelector } from "react-redux";

const Favorites = () => {
  const wishLists = useSelector((state) => state.wishLists);

  return (
    <>
      <SecondNavbar />
      <Container maxWidth="xl">
        <Title title="Избранные товары" style="f-bold mb-6 mt-12" />
        <div className="favorites mb-12">
          {wishLists.map((item) => (
            <Cart cart={item.product} key={item.id} favorite={true}/>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Favorites;
