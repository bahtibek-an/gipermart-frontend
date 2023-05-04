import React from "react";
import "../../assets/scss/_cart.scss";
import { BiHeart } from "react-icons/bi";
import { HiOutlineShoppingCart, HiOutlineEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBasketProduct, craeteWishListProduct, deleteWishList, showRightModal } from "../../redux/actions";
import { appendProductToUserCart, appendProductToWishList, deleteProductFromWishList } from "../../http/ProductAPI";
import { numberWithCommas } from "../../helper";

const Cart = ({ cart }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const favorite = useSelector((state) => state?.wishLists.find((item) => item?.product?.id == cart.id));
  const hasInCart = useSelector((state) => state?.basket?.filter(item => !item.cart_status).find((item) => item?.product?.id == cart.id));
  const exchangeRate = useSelector((state) => state.app.exchange);

  const addProductToCart = async (e) => {
    e.preventDefault();
    if(!user.isAuth) {
      return dispatch(showRightModal());
    }
    if(hasInCart) {
      return navigate("/basket");
    }
    try {
      const data = await appendProductToUserCart(user?.user?.id, cart.id, 1, cart.price);
      dispatch(createBasketProduct(data));
    } catch (error) {
      console.log(error);
    }
  }


  const addProductToWishList = async (e) => {
    e.preventDefault();
    if(!user.isAuth) {
      return dispatch(showRightModal());
    }
    if(favorite) {
      return deleteProductFromWishList(favorite.id)
      .then(() => {
        dispatch(deleteWishList(cart.id));
      });
    }
    return appendProductToWishList(user?.user?.id, cart.id)
      .then((data) => {
        dispatch(craeteWishListProduct(data));
      });
  }

  return (
    <div className="cart">
      <Link to={`/product/${cart.id}`}>
      <button
        onClick={addProductToWishList}
        className={`${!favorite ? "favorite" : "favorited"} favorite-icon`}
      >
        <BiHeart size={24} />
      </button>
        <div className="cart-item">
          <div onClick={() => navigate(`/product/${cart.id}`)} className="cart-image">
            <img src={cart?.front_image} alt="" />
          </div>
          <div onClick={() => navigate(`/product/${cart.id}`)} className="cart-name">
            { cart.title_ru }
          </div>
          <div className="rassrochka f-bold text-center">{ numberWithCommas(cart.installment_plan * exchangeRate) } сум</div>
          <div className="cart-action">
            <div className="cart-price f-bold">{ numberWithCommas((cart.price * exchangeRate)) } сум</div>
            <button onClick={addProductToCart} className="cart-basket hover:shadow-lg shadow-none">
              {!hasInCart ? (
                <HiOutlineShoppingCart stroke="rgb(33, 26, 26)" size={24} />
              ) : (
                <HiOutlineEye size={24}/>
              )}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cart;
