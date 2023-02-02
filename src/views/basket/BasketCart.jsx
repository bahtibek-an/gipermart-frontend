import React from "react";
import Counter from "../../components/counter/Counter";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

const BasketCart = () => {

    return (
        <div className="basket-cart">
            <div className="basket-image">
            <img
                src="https://picsum.photos/168/98"
                alt=""
            />
            </div>
            <div className="basket-text">
            <Link to="" className="basket-name">
                Acer Aspire 3 Intel Pentium N4500/4GB/1TB HDD/Intel UHD 15.6"
                (A315-34-C7AH) Pure Silver
            </Link>
            <div className="basket-price">3 113 600 Сум</div>
            <div className="basket-action">
                <div className="basket-remove">
                <BiTrash size={16} />
                Удалить
                </div>
                <Counter />
            </div>
            </div>
        </div>
    );
}

export default  BasketCart;