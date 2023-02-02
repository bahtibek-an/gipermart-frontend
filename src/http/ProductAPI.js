import $host from "./index.js";
// import { render } from '@testing-library/react';
// import ServerError from "../views/error/ServerError";


export const fetchAllProducts = async () => {
    try {
        const { data } = await $host.get("product/api/products/");
        return data;
    } catch (error) {
        // if(error.toJSON().message === 'Network Error'){
        //     render(<ServerError/>)
        // }
        console.log(error);
    }
    
}

export const fetchAllCategories = async () => {
    try {
        const { data } = await $host.get("product/api/category/all/");
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchOneProduct = async (id) => {
    const { data } = await $host.get(`product/products/${id}/`)

    return data;
}

export const addProductToUserCart = async (userId, productId, quantity) => {
    const { data } = await $host.post("cart/add-cart", {user: userId, product: productId, quantity });
    return data;
}

export const fetchAllBasketCarts = async (userId) => {
    const { data } = await $host.get(`cart/user-carts/${userId}`);
    return data;
}


export const fetchProductsBySearch = async (query) => {
    const { data } = await $host.get(`search/api/${query}/`);
    return data;
}