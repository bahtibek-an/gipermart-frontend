import React from "react";
import Counter from "../../components/counter/Counter";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { deleteCart } from "../../http/ProductAPI";

const BasketCart = ({ cart, deleteCartItem }) => {
    const product = cart.product;
    const removeCart = () => {
        deleteCart(cart.id);
        deleteCartItem(cart.id);
    }

    return (
        <div className="basket-cart">
            <div className="basket-image">
            <img
                src="https://picsum.photos/168/98"
                alt=""
            />
            </div>
            <div className="basket-text" style={{flex: "60%"}}>
            <Link to="" className="basket-name">
               {product.name}
            </Link>
            <div className="basket-price">3 113 600 Сум</div>
            <div className="basket-action" onClick={removeCart}>
                <div className="basket-remove">
                <BiTrash size={16}/>
                    Удалить
                </div>
                <Counter quantity={cart.quantity}/>
            </div>
            </div>
        </div>
    );
}

export default BasketCart;