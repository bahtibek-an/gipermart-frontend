import { categoriesAlgo } from "../helper"
import { fetchAllBasketCarts, fetchAllCategories, fetchAllProducts, getWishListsByUserId } from "../http/ProductAPI"
import { CREATE_BASKET_PRODUCT, CREATE_BASKET_TO_LOCAL, CREATE_CHECKOUT_IN_USER, CREATE_USER, CREATE_WISHLIST, DELETE_BASKET_IN_LOCAL, DELETE_BASKET_PRODUCT, DELETE_USER, DELETE_WISHLIST, FETCH_BASKET_PRODUCTS, FETCH_CATEGORIES, FETCH_PRODUCTS, FETCH_USER_WISHLISTS, HIDE_LOADER, HIDE_RIGHT_MODAL, SHOW_LOADER, SHOW_MODAL_LOGIN, SHOW_MODAL_SIGNUP, SHOW_RIGHT_MODAL, UPDATE_BASKET_COUNTER } from "./types"

export function hideLoader() {
    return {
        type: HIDE_LOADER
    }
}

export function showLoader() {
    return {
        type: SHOW_LOADER
    }
}


export function fetchCategories(data) {
    return { 
        type: FETCH_CATEGORIES, 
        payload: categoriesAlgo(data) 
    }
}

export function fetchUserWishLists(userId) {
    return async (dispatch) => {
        const data = await getWishListsByUserId(userId);
        dispatch({type: FETCH_USER_WISHLISTS, payload: data});
    }
}

export function fetchProducts(data) {
    return {
        type: FETCH_PRODUCTS,
        payload: data
    }
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCTS, payload: data })
        dispatch(fetchCategories());
        // dispatch(hideLoader());
    }
}

export function fetchUserBasket(userId) {
    return async (dispatch) => {
        const data = await fetchAllBasketCarts(userId);
        dispatch({ type: FETCH_BASKET_PRODUCTS, payload: data })
    }
}

export function deleteBasketProduct(productId) {
    return {
        type: DELETE_BASKET_PRODUCT,
        payload: productId
    }
}

export function createUser(user) {
    return {
        type: CREATE_USER,
        payload: user
    }
}

export function deleteUser() {
    return {
        type: DELETE_USER
    }
}

export function showRightModal() {
    return {
        type: SHOW_RIGHT_MODAL
    }
}

export function hideRightModal() {
    return {
        type: HIDE_RIGHT_MODAL
    }
}

export function createBasketProduct(data) {
    return {
        type: CREATE_BASKET_PRODUCT,
        payload: data
    }
}

export function deleteWishList(productId) {
    return {
        type: DELETE_WISHLIST,
        payload: productId
    }
}

export function craeteWishListProduct(data) {
    return {
        type: CREATE_WISHLIST,
        payload: data
    }
}

export const createCheckoutInUser = (data) => {
    return {
        type: CREATE_CHECKOUT_IN_USER,
        payload: data
    }
}

export const createBasketToLocal = (data) => {
    return {
        type: CREATE_BASKET_TO_LOCAL,
        payload: data
    }
}

export const deleteBasketInLocal = (productId) => {
    return {
        type: DELETE_BASKET_IN_LOCAL,
        payload: productId
    }
}

export const updateBasketCounter = (data) => {
    return {
        type: UPDATE_BASKET_COUNTER,
        payload: data
    }
}