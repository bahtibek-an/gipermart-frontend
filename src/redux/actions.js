import { fetchAllBasketCarts, fetchAllCategories, fetchAllProducts, getWishListsByUserId } from "../http/ProductAPI"
import { CREATE_BASKET_PRODUCT, CREATE_USER, DELETE_BASKET_PRODUCT, DELETE_USER, DELETE_WISHLIST, FETCH_BASKET_PRODUCTS, FETCH_CATEGORIES, FETCH_PRODUCTS, FETCH_USER_WISHLISTS, HIDE_LOADER, HIDE_RIGHT_MODAL, SHOW_LOADER, SHOW_MODAL_LOGIN, SHOW_MODAL_SIGNUP, SHOW_RIGHT_MODAL } from "./types"

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


export function fetchCategories() {
    return async (dispatch) => {
        const data = await fetchAllCategories();
        dispatch({ type: FETCH_CATEGORIES, payload: data });
        // dispatch(hideLoader);
    }
}

export function fetchUserWishLists(userId) {
    return async (dispatch) => {
        const data = await getWishListsByUserId(userId);
        dispatch({type: FETCH_USER_WISHLISTS, payload: data});
    }
}

export function fetchProducts() {
    return async (dispatch) => {
        const data = await fetchAllProducts();
        dispatch({ type: FETCH_PRODUCTS, payload: data })
        dispatch(fetchCategories());
        dispatch(hideLoader());
    }
}

export function fetchUserBasket(userId) {
    return async (dispatch) => {
        const data = await fetchAllBasketCarts(userId);
        dispatch({ type: FETCH_BASKET_PRODUCTS, payload: data })
    }
}

export function deleteBasketProduct(carts, id) {
    const result = carts.filter((item) => item.id !== id);
    return {
        type: DELETE_BASKET_PRODUCT,
        payload: result
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