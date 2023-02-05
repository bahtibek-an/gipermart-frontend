import React from "react";
import "../../assets/scss/_cart.scss";
import { BiHeart } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteWishList, showRightModal } from "../../redux/actions";
import { appendProductToWishList, deleteProductFromWishList } from "../../http/ProductAPI";

const Cart = ({ cart/*, favorite */ }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const favorite = useSelector((state) => state?.wishLists.find((item) => item?.product?.id == cart.id));
  
  const handleClick = async () => {
    if(!user.isAuth) {
      return dispatch(showRightModal());
    }
    if(favorite) {
      return deleteProductFromWishList(favorite.id)
      .then(() => {
        dispatch(deleteWishList(cart.id));
      });
    }
    return await appendProductToWishList(user?.user?.id, cart.id);
  }

  return (
    <div className="cart">
      <button
        onClick={handleClick}
        className={`${!favorite ? "favorite" : "favorited"} favorite-icon`}
      >
        <BiHeart size={24} />
      </button>
      <Link to={`/product/${cart.id}`}>
        <div className="flex flex-col">
          <div onClick={() => navigate(`/product/${cart.id}`)} className="cart-image">
            <img src={cart?.image || "./macb.jpeg"} alt="" />
          </div>
          <div onClick={() => navigate(`/product/${cart.name}`)} className="cart-name">
            { cart.title || "MacBook Pro 16-inch M2 Pro/16/512GB Space Gray 2023" }
          </div>
          <div className="rassrochka f-bold text-center">{ cart.installment_plan }</div>
          <div className="cart-action">
            <div className="cart-price f-bold">{ cart.price || "37 739 500 сум" }</div>
            <button className="cart-basket hover:shadow-lg shadow-none">
              <HiOutlineShoppingCart stroke="rgb(33, 26, 26)" size={24} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Cart;
