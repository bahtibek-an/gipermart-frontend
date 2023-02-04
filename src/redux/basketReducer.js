import { FETCH_BASKET_PRODUCTS } from "./types";

const initialState = [];

export const basketReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_BASKET_PRODUCTS:
            return [...action.payload];
        default:
            return state;
    }
}