import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $host from "../../../../http";
import LoadingCart from "../../../cart/LoadingCart";
import { numberWithCommas } from "../../../../helper";
import { useSelector } from "react-redux";

const ProductItem = ({ category }) => {
    const [ products, setProducts ] = useState([]);
    const [loading, setLoading] = useState(true);
    const exchangeRate = useSelector((state) => state.app.exchange);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await $host.get(`product/product_filter/?search=${category.slug}&limit=3`);
            setProducts(data.results);
            setLoading(false)
        }
        fetchProducts();
    }, []);

    if(loading) return <LoadingCart/>

    return products.map((product) => (
        <Link key={product.id} to={`/product/${product?.id}/`} className="department-box">
            <div className="department-image relative">
                <img
                    src={product.front_image}
                    alt=""
                />
            </div>
            <div className="department-text">
                <div className="department-name">
                    {product.title_ru}
                </div>
                <div className="department-rassrochka">{numberWithCommas(product.installment_plan * exchangeRate)} Сум</div>
                <div className="department-price">
                <div className="price">{numberWithCommas(product.sale_price * exchangeRate)} Сум</div>
                {/* <div className="price_old">{numberWithCommas(product.price * exchangeRate)} Сум</div> */}
                </div>
            </div>
        </Link>
    ));
}

export default ProductItem;