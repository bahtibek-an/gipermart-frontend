import { fetchAllBasketCarts, fetchAllCategories, fetchAllProducts } from "../http/ProductAPI"
import { CREATE_USER, DELETE_BASKET_PRODUCT, DELETE_USER, FETCH_BASKET_PRODUCTS, FETCH_CATEGORIES, FETCH_PRODUCTS, HIDE_LOADER, HIDE_RIGHT_MODAL, SHOW_LOADER, SHOW_MODAL_LOGIN, SHOW_MODAL_SIGNUP, SHOW_RIGHT_MODAL } from "./types"

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

export function createUser(id) {
    return {
        type: CREATE_USER,
        payload: id
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