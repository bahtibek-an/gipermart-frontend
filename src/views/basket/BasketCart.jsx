import React, { useEffect, useState } from "react";
import Counter from "../../components/counter/Counter";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { deleteCart } from "../../http/ProductAPI";
import { useDispatch, useSelector } from "react-redux";
import { updateBasketCounter, incrementBasketCounter, decrementBasketCounter } from "../../redux/actions";
import { updateCart } from "../../http/ProductAPI";
import { numberWithCommas } from "../../helper";

const BasketCart = ({ cart, deleteCartItem }) => {
    const [ counter, setCounter ] = useState(cart.quantity);
    const product = cart.product
    const dispatch = useDispatch();
    const exchangeRate = useSelector((state) => state.app.exchange);
    const totalPrice = counter * +product.price;
    const removeCart = () => {
        deleteCartItem(cart.id);
    }
    const minusCounter = () => {
        if (counter > 1) {
            dispatch(decrementBasketCounter(cart.id));
            setCounter((count) => count - 1);
            return updateCart(
                cart.id, 
                cart.user?.id, 
                cart.product?.id,
                counter - 1,
                `${(counter - 1) * product?.price}`
            );
        }
    };

    const plusCounter = () => {
        dispatch(incrementBasketCounter(cart.id));
        setCounter((count) => count + 1);
        return updateCart(
            cart.id, 
            cart.user?.id,
            cart.product?.id,
            counter + 1,
            `${(counter + 1) * product.price}` 
        );
    };

    if(Object.keys(product).length === 0) {
        return null;
    }


    return (
        <Link to={`/product/${product?.id}`}>
            <div className="basket-cart">
                <div className="basket-image">
                <img
                    src={product.front_image}
                    alt=""
                />
                </div>
                <div className="basket-text" style={{flex: "60%"}}>
                <Link to="" className="basket-name">
                    {product.title_en}
                </Link>
                <div className="basket-price">{numberWithCommas(totalPrice * exchangeRate)} Сум</div>
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