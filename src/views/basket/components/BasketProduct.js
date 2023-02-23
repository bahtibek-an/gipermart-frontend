import React from "react";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../../../helper";
import { API_URL } from "../../../http";

const BasketProduct = ({ basket }) => {
    const product = useSelector((state) => state.products.find((item) => item.id == basket.product));
    
    return (
        <div className="checkout-cart p-1" >
            <div className="flex items-center">
                <div className="checkout-image">
                    <img
                        src={API_URL + product.media[0]?.img_url}
                        alt=""
                    />
                </div>
                <div className="checkout-name">
                    {/* Acer Aspire 3 Intel Pentium N4500/4GB/1TB HDD/Intel UHD 15.6"
                    (A315-34-C7AH) Pure Silver */}
                    {product.product.name}
                </div>
            </div>
            <div className="checkout-price gap-x-2">
                {basket.quantity} x <span className="f-bold price">{numberWithCommas(product.price)} Сум</span>
                {/* <span className="f-bold price">{product.price} Сум</span> */}
            </div>
        </div>
    );
}

export default BasketProduct;