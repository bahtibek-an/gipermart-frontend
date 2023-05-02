import axios from "axios";
import $host from "./index.js";
// import { render } from '@testing-library/react';
// import ServerError from "../views/error/ServerError";


export const fetchAllProducts = async () => {
    try {
        const { data } = await $host.get("product/api/products/?limit=20&offset=0");
        return data.results;
    } catch (error) {
        // if(error.toJSON().message === 'Network Error'){
        //     render(<ServerError/>)
        // }
        console.log(error);
    }
    
}

export const fetchAllCategories = async () => {
    try {
        const { data } = await $host.get("product/category/all/");
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchOneProduct = async (id) => {
    try {
        const { data } = await $host.get(`product/product-detail/${id}/`)
        return data;
    } catch (error) {
        console.log(error);   
    }
}


export const appendProductToUserCart = async (userId, productId, quantity, total) => {
    const { data } = await $host.post("cart/add-cart", {user: userId, product: productId, quantity, total });
    console.log(data);
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


export const appendProductToWishList = async (userId, productId) => {
    const { data } = await $host.post("outside/add-wishlist", {user: userId, product: productId});
    return data;
}

export const deleteProductFromWishList = async (id) => {
    const data = await $host.delete(`outside/delete-wishlist/${id}/`);
    return data;
}

export const getWishListsByUserId = async (userId) => {
    const wishLists = await $host.get(`outside/user-wishlist/${userId}`);
    return wishLists.data;
}

export const deleteCart = async (id) => {
    await $host.delete(`cart/delete-cart/${id}/`);
}

export const fetchAttributesByCategoryId = async (id) => {
    try {
        const { data } = await $host.get(`product/api/products/filter/${id}/`);
        return data;
    } catch (error) {
        return [];
    }
}

export const fetchFilterProducts = async (productSlug, sortType, filterPrice, brandParams, colorParams, limit, offset) => {
    try {
        // const { data } = await $host.get(`product/product_filter/?ordering=${sortType}&search=${productSlug}&${params}&min_price=${filterPrice.min}&max_price=${filterPrice.max}`);4

    } catch (error) {
        console.log(error);
    }
}

export const updateCart = async (cartId, userId, productId, quantity, totalPrice) => {
    try {
        const { data } = await $host.put(`cart/update-cart/${cartId}`, {
            user: userId,
            product: productId,
            quantity: quantity,
            total: totalPrice
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchExchangeRates = async () => {
    try {
        const { data } = await $host.get("outside/exchange-rates/");
        return data;
    } catch (error) {
        console.log(error);
    }
}