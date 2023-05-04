import React from "react";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../../../helper";

const BasketProduct = ({ basket }) => {
    const product = basket.product;
    const exchange = useSelector((state) => state.app.exchange);

    return (
        <div className="checkout-cart p-1" >
            <div className="flex items-center flex w-full">
                <div className="checkout-image">
                    <img
                        src={product.front_image}
                        alt=""
                    />
                </div>
                <div className="flex flex-1 flex-wrap checkout-text">
                    {/* Acer Aspire 3 Intel Pentium N4500/4GB/1TB HDD/Intel UHD 15.6"
                    (A315-34-C7AH) Pure Silver */}
                    <span className="checkout-name mr-auto">{product.title_en}</span>
                    <div className="checkout-price gap-x-2">
                        {basket.quantity} x <span className="f-bold price">{numberWithCommas(product.price * exchange)} Сум</span>
                        {/* <span className="f-bold price">{product.price} Сум</span> */}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default BasketProduct;