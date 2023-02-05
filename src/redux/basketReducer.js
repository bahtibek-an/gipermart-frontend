import { CREATE_BASKET_PRODUCT, DELETE_BASKET_PRODUCT, FETCH_BASKET_PRODUCTS } from "./types";

const initialState = [];

export const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BASKET_PRODUCTS:
            return [...action.payload];
        case DELETE_BASKET_PRODUCT:
            return [...action.payload];
        case CREATE_BASKET_PRODUCT:
            return [...state, ...action.payload];
        default:
            return state;
    }
}