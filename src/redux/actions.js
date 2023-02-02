import { fetchAllCategories, fetchAllProducts } from "../http/ProductAPI"
import { CREATE_USER, DELETE_USER, FETCH_CATEGORIES, FETCH_PRODUCTS, HIDE_LOADER, SHOW_LOADER } from "./types"

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

