import React, { useEffect, useState } from "react";
import Counter from "../../components/counter/Counter";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { deleteCart } from "../../http/ProductAPI";
import { useDispatch, useSelector } from "react-redux";
import { deleteBasketInLocal, updateBasketCounter, incrementBasketCounter, decrementBasketCounter } from "../../redux/actions";
import { updateCart } from "../../http/ProductAPI";

const BasketCart = ({ cart, deleteCartItem }) => {
    const [ counter, setCounter ] = useState(cart.quantity);
    const product = useSelector((state) => state.products.find((item) => item.id == cart.product));
    const dispatch = useDispatch();
    const totalPrice = counter * product.price;
    const removeCart = () => {
        dispatch(deleteBasketInLocal(cart.product));
        deleteCart(cart.id)
            .then((data) => {
                deleteCartItem(cart.product.id);
            });
    }

    const minusCounter = () => {
        if (counter > 1) {
            dispatch(decrementBasketCounter(cart.id));
            setCounter((count) => count - 1);
            return updateCart(
                cart.id, 
                cart.user?.id, 
                cart.product,
                counter - 1,
                `${(counter - 1) * product.price}` 
            );
        }
    };

    const plusCounter = () => {
        dispatch(incrementBasketCounter(cart.id));
        setCounter((count) => count + 1);
        return updateCart(
            cart.id, 
            cart.user?.id,
            cart.product,
            counter + 1,
            `${(counter + 1) * product.price}` 
        );
    };


    return (
        <Link to={`/product/${product.id}`}>
            <div className="basket-cart">
                <div className="basket-image">
                <img
                    src={"https://yruoebgair.tk/" + product.media[0]?.img_url}
                    alt=""
                />
                </div>
                <div className="basket-text" style={{flex: "60%"}}>
                <Link to="" className="basket-name">
                    {product?.product.name}
                </Link>
                <div className="basket-price">{totalPrice} Сум</div>
                <div className="basket-action" onClick={(e) => e.preventDefault()}>
                    <div className="basket-remove" onClick={removeCart}>
                        <BiTrash size={16}/>
                        Удалить
                    </div>
                    <Counter 
                        quantity={counter}
                        minusCounter={minusCounter}
                        plusCounter={plusCounter}
                    />
                </div>
                </div>
            </div>
        </Link>
    );
}

export default BasketCart;