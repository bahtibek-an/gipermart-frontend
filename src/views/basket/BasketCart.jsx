import React, { useEffect, useState } from "react";
import Counter from "../../components/counter/Counter";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { deleteCart } from "../../http/ProductAPI";
import { useDispatch } from "react-redux";
import { deleteBasketInLocal, updateBasketCounter } from "../../redux/actions";

const BasketCart = ({ cart, deleteCartItem, carts }) => {
    const [ counter, setCounter ] = useState(cart.quantity);
    const dispatch = useDispatch();
    const product = cart.product;
    const removeCart = () => {
        dispatch(deleteBasketInLocal(cart.product?.id));
        deleteCart(cart.id)
            .then((data) => {
                deleteCartItem(cart.product.id);
            });
    }

    const minusCounter = () => {
        // const 
        dispatch(updateBasketCounter());
        if (counter > 1) {
          setCounter((count) => count - 1);
        } else {

        }
    };

    const plusCounter = () => {
        setCounter((count) => count + 1);
    };

    useEffect(() => {
        return () => {
            console.log("componentDidMount!");
        }
    }, []);


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
            <div className="basket-price">{cart.total} Сум</div>
            <div className="basket-action">
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
    );
}

export default BasketCart;