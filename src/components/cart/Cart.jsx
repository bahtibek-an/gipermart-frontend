import React from "react";
import "../../assets/scss/_cart.scss";
import { BiHeart } from "react-icons/bi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = ({ cart, favorite }) => {
  const navigate = useNavigate();


  return (
    <Link to={`/product/${cart.id}`}>
      <div className="cart">
        <button
          className={`${!favorite ? "favorite" : "favorited"} favorite-icon`}
        >
          <BiHeart size={24} />
        </button>
        <div className="flex flex-col">
          <div onClick={() => navigate(`/product/${cart.id}`)} className="cart-image">
            <img src={cart?.image} alt="" />
          </div>
          <div onClick={() => navigate(`/product/${cart.id}`)} className="cart-name">
            { cart.title }
          </div>
          <div className="rassrochka f-bold text-center">{ cart.installment_plan }</div>
          <div className="cart-action">
            <div className="cart-price f-bold">{ cart.price }</div>
            <button className="cart-basket hover:shadow-lg shadow-none">
              <HiOutlineShoppingCart stroke="rgb(33, 26, 26)" size={24} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Cart;
